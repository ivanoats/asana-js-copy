var asana = require('asana-api');

var oldProjectId = '11169835259592';
var newProjectId = '12074713034917';
var workspace = '498346170860';
var client = asana.createClient({
  apiKey: process.env.ASANA_API_KEY
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
        if (task.name === '') {
          task.name = 'blank';
        }
        setTimeout(createTask(task),5000);
      }
    });
  }
});
