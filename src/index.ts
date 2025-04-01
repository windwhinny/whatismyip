import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
const fetch = import('node-fetch');

// Create server instance
const server = new McpServer({
  name: "whatismyip",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  'getIp',
  'Get the IP address of the user',
  {},
  async () => {
    const resp = await (await fetch).default('https://api64.ipify.org?format=json');
    const data = await resp.json() as { ip: string};
    return {
      content: [{
        type: 'text',
        text: data.ip,
      }]
    };
  }
)

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("whatismyip MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});