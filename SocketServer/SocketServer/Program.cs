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

			int count = 0;
			var broadcast = new Action(() =>
			{
				var message = new
				{
					count = count++,
					lastUpdated = DateTime.Now
				};

				sockets.ForEach(s => s.Send(JsonConvert.SerializeObject(message)));
			});


			server.Start(socket =>
			{
				socket.OnOpen = () => sockets.Add(socket);
				socket.OnClose = () => sockets.Remove(socket);
				socket.OnMessage = json =>
				{
					var message = JsonConvert.DeserializeObject<Message>(json);

					if (message.Type.Equals("increment", StringComparison.OrdinalIgnoreCase))
						broadcast();

				};
			});

			
			while (true)
			{
				Console.WriteLine("Press a key to send a message");
				Console.ReadKey();

				broadcast();
			}
		}
	}

	public class Message
	{
		public string Type { get; set; }
	}
}
