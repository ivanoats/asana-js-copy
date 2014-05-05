#!/usr/bin/env node

var asana = require('asana-api');
var argv  = require('yargs')
  .usage('Copy tasks from one Asana project to another\n Usage: $0 --new projectId --old projectId --workspace id --key ASANA_API_KEY')
  .example('$0 --new 80586 --old 8086 --workspace 386 --key ACDCBAGTMWSIY')
  .alias('n', 'new')
  .alias('o', 'old')
  .alias('w', 'workspace')
  .alias('k', 'key')
  .argv;

var oldProjectId = argv.new;
var newProjectId = argv.old;
var workspace    = argv.workspace;

var client = asana.createClient({
  apiKey: argv.key
});

function createTask(task) {
  client.tasks.create(workspace, newProjectId, task, function(err, data) { 
    if (err) { 
      console.dir(err);
      process.exit(1);
    }
    if (data) {
      console.dir(data);
    }
  });
}

client.projects.tasks(oldProjectId, function (err, tasks) {
  if (err) {
    console.dir(err);
    process.exit(1);
  } else {
    tasks.forEach(function(task){
      if (task) {
        if (task.name === '') { task.name = 'blank'; }
        setTimeout(createTask(task),5000);
      }
    });
  }
});
