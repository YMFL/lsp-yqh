import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';
// The plugin currently requires the show-hint extension from CodeMirror, which must be
// installed by the app that uses the LSP connection
import 'codemirror/addon/hint/show-hint.css';
import './show-hint';

import '../src/codemirror-lsp.css';

import {LspWsConnection, CodeMirrorAdapter} from '../src/index';

let sampleHtml = `
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>Basic HTML</h1>
  </body>
</html>
`;

let sampleCss = `
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.header {
  color: blue;
}
`;

let htmlEditor = CodeMirror(document.querySelector('.html'), {
  theme: 'idea',
  lineNumbers: true,
  mode: 'htmlmixed',
  value: sampleHtml,
  gutters: ['CodeMirror-lsp'],
});

interface lspServerOptions {
  rootPath: string;
  htmlPath: string;
  cssPath: string;
  jsPath: string;
}

let xxx = '{"account":{"id":0,"ip":"","port":0,"resource_id":0,"username":"test1","password":"Test123!@#","db_name":"auditpoc","description":"","use_for":"","connect_as":"","user_id":0,"type":0,"created_at":0,"created_by":"","updated_at":0,"updated_by":""},"database":"auditpoc","db_id":796}'
let html = {
  serverUri: 'ws://192.168.3.42/bomberws/v1/ws/bomber/complements',
  languageId: 'sql',
  rootUri: '/',
  documentUri: '/',
  documentText: () => htmlEditor.getValue(),
  initializationOptions: JSON.parse(xxx),
};

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE1OTIwMzcsImlhdCI6MTY3MTUwNTYzNywiaWQiOjMsIm5iZiI6MTY3MTUwNTYzNywicGVybWlzc2lvbiI6IltcInJlYWRcIiwgXCJ3cml0ZVwiLCBcImRlbGV0ZVwiLCBcImF1ZGl0X3Rhc2tfZXhlY1wiLCBcImF1ZGl0X3Rhc2tfdXBkYXRlXCIsIFwiYXVkaXRfdGFza19hZGRcIiwgXCJ3aWtpX3JlYWRcIiwgXCJ3aWtpX3dyaXRlXCIsIFwid2lraV9kZWxcIiwgXCJzaGVsbF9jb25uZWN0XCIsIFwic3NoX2Nvbm5lY3RcIiwgXCJzY3JpcHRfdGVzdFwiLCBcImF1ZGl0X2dsb2JhbF9pZ25vcmVcIiwgXCJzd2l0Y2hvdmVyXCJdIiwicm9sZSI6InN1cGVyX2FkbWluIiwicm9sZWlkIjoiMiIsInN5c3RlbV9jb2RlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIn0.Mc8KXTyVMg_Nw91eijbabagVGs05fGuEVPINQBcBx-o'
let htmlConnection = new LspWsConnection(html).connect(new WebSocket(html.serverUri, [token]));
let htmlAdapter = new CodeMirrorAdapter(htmlConnection, {
  quickSuggestionsDelay: 100,
}, htmlEditor);

