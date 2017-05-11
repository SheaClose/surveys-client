(function() {
  var connector = tableau.makeConnector();
  connector.getSchema = function (schemaCallback) {

      var cols = [
          {id: 'campus', alias: 'Campus', dataType: tableau.dataTypeEnum.string},
          {id: 'cohortName', alias: 'Cohort', dataType: tableau.dataTypeEnum.string},
          {id: 'format', alias: 'Format', dataType: tableau.dataTypeEnum.string},
          {id: 'unit', alias: 'Week', dataType: tableau.dataTypeEnum.int},
          {id: 'OSAT', alias: 'Overall Satisfaction', dataType: tableau.dataTypeEnum.int},
          {id: 'FSAT', alias: 'Instructor Satisfaction', dataType: tableau.dataTypeEnum.int},
          {id: 'MSAT', alias: 'Mentor Satisfaction', dataType: tableau.dataTypeEnum.int},
          {id: 'CSAT', alias: 'Curriculum Satisfaction', dataType: tableau.dataTypeEnum.int},
          {id: 'date', alias: 'Date', dataType: tableau.dataTypeEnum.string}
      ];


      var tableInfo = {
          id : "devmt_stats",
          alias : "Devmountain student satisfaction survey results",
          columns : cols
      };

      schemaCallback([tableInfo]);

  };


  connector.getData = function (table, doneCallback) {

      fetch('/api/tableau/data')
          .then(function(res) {return res.json()})
          .then(function(data) {
              var payload = [];

              function parseDate(date) {
                  var d = new Date(date);
                  var year = d.getFullYear();
                  var date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
                  var month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth();

                  return month + '/' + date + '/' + year;
              }


              data.forEach(function(item) {
                  var dataObj = {
                      campus: item.campus,
                      cohortName: item.cohort,
                      format: item.format,
                      unit: item.unit,
                      OSAT: item.OSAT,
                      FSAT: item.FSAT,
                      MSAT: item.MSAT,
                      CSAT: item.CSAT,
                      date: parseDate(item.date)
                  };

                  payload.push(dataObj)
              });

              table.appendRows(payload);
              doneCallback();
          });

  };

  tableau.registerConnector(connector);
})()
