using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fleck;

namespace SocketServer
{
	class Program
	{
		static void Main(string[] args)
		{
			var server = new WebSocketServer("ws://0.0.0.0:8090");
			var sockets = new List<IWebSocketConnection>();

			server.Start(socket =>
			{
				socket.OnOpen = () => sockets.Add(socket);
				socket.OnClose = () => sockets.Remove(socket);
			});

			while (true)
			{
				Console.WriteLine("Press a key to send a message");
				Console.ReadKey();
				sockets.ForEach(s => s.Send("{ \"name\": \"Dave\" }"));
			}
		}
	}
}
