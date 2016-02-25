using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fleck;
using Newtonsoft.Json;

namespace SocketServer
{
	class Program
	{
		static void Main(string[] args)
		{
			var server = new WebSocketServer("ws://0.0.0.0:8090");
			var sockets = new List<IWebSocketConnection>();

			var handlers = new Dictionary<string, Action<Message>>(StringComparer.OrdinalIgnoreCase);

			int count = 0;

			handlers["increment"] = message =>
			{
				 var reply = JsonConvert.SerializeObject(new
				 {
					 count = ++count,
					 lastUpdated = DateTime.Now
				 });

				 sockets.ForEach(s => s.Send(reply));
			 };

			handlers["decrement"] = message =>
			{
				var reply = JsonConvert.SerializeObject(new
				{
					count = --count,
					lastUpdated = DateTime.Now
				});

				sockets.ForEach(s => s.Send(reply));
			};

			server.Start(socket =>
			{
				socket.OnOpen = () => sockets.Add(socket);
				socket.OnClose = () => sockets.Remove(socket);
				socket.OnMessage = json =>
				{
					var message = JsonConvert.DeserializeObject<Message>(json);

					Action<Message> handler;

					if (handlers.TryGetValue(message.Type, out handler))
						handler(message);

				};
			});


			Console.WriteLine("Listening on {0}", server.Location);
			Console.ReadKey();
		}
	}

	public class Message
	{
		public string Type { get; set; }
	}
}
