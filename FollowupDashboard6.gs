function resetAllTriggers() {
  // قائمة كل الفانكشن اللي عايز تعمل لها triggers
  var functionsList = [
    'importDistributionData',
    'importDistributionData2',
    'importDistributionData3',
    'importDistributionData4',
    'importDistributionData5',
    "countAndSendResult",
    "importDistributionData6",
    "importDistributionData7",
    "importDistributionData8",
    "importDistributionData9",
    "importDistributionData10"
  ];

  // امسح كل الـ triggers القديمة
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

  // اعمل trigger لكل function كل 10 دقائق بدءًا من الوقت الحالي
  for (var i = 0; i < functionsList.length; i++) {
    ScriptApp.newTrigger(functionsList[i])
             .timeBased()
             .everyMinutes(10)
             .create();
  }
}
