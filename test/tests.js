module('jQuery Week Calendar v2.0-dev');
function formatTimeZone(){
  var TZ = -(new Date()).getTimezoneOffset();
  var TZ = {
    'sign': (TZ < 0 ? '-' : '+'),
    'hour': (Math.floor(TZ / 60)),
    'minute': (TZ % 60)};

  return TZ['sign'] + (TZ['hour'] < 10 ? '0' : '') + TZ['hour'] + ":" + (TZ['minute'] < 10 ? '0' : '') + TZ['minute'];
}

test('Default Options', function() {

    var $calendar = $('#calendar');
    $calendar.weekCalendar();

  expect(25);

	same($calendar.weekCalendar('option', 'alwaysDisplayTimeMinutes'), true);
	same($calendar.weekCalendar('option', 'use24Hour'), false);
	same($calendar.weekCalendar('option', 'daysToShow'), 7);
	same($calendar.weekCalendar('option', 'minBodyHeight'), 100);
	same($calendar.weekCalendar('option', 'useShortDayNames'), false);
	same($calendar.weekCalendar('option', 'timeSeparator'), ' to ');
	same($calendar.weekCalendar('option', 'startParam'), 'start');
	same($calendar.weekCalendar('option', 'endParam'), 'end');
/*	same($("#calendar").weekCalendar('option','businessHours.start'), 8);
	same($("#calendar").weekCalendar('option','businessHours.end'), 18);
	same($("#calendar").weekCalendar('option','businessHours.limitDisplay'), false);
*/
    same($calendar.weekCalendar('option', 'newEventText'), 'New Event');
    same($calendar.weekCalendar('option', 'timeslotHeight'), 20);
    same($calendar.weekCalendar('option', 'defaultEventLength'), 2);
    same($calendar.weekCalendar('option', 'timeslotsPerHour'), 4);
    same($calendar.weekCalendar('option', 'minDate'), null);
    same($calendar.weekCalendar('option', 'maxDate'), null);
    same($calendar.weekCalendar('option', 'buttons'), true);
    same($calendar.weekCalendar('option', 'scrollToHourMillis'), 500);
    same($calendar.weekCalendar('option', 'allowCalEventOverlap'), false);
    same($calendar.weekCalendar('option', 'overlapEventsSeparate'), false);
    same($calendar.weekCalendar('option', 'readonly'), false);
    same($calendar.weekCalendar('option', 'allowEventCreation'), true);

    same($calendar.weekCalendar('option', 'displayOddEven'), false);
    same($calendar.weekCalendar('option', 'textSize'), 13);
    same($calendar.weekCalendar('option', 'headerSeparator'), '<br />');
    same($calendar.weekCalendar('option', 'getHeaderDate'), null);
    same($calendar.weekCalendar('option', 'preventDragOnEventCreation'), false);

    //same($("#calendar").weekCalendar('option','draggable'), true);

});

test('Date internationalization', function() {

  var $calendar = $('#calendar');
  $calendar.weekCalendar({
      date: new Date(),
      firstDayOfWeek: $.datepicker.regional['fr'].firstDay,
      shortDays: $.datepicker.regional['fr'].dayNamesShort,
      longDays: $.datepicker.regional['fr'].dayNames,
      shortMonths: $.datepicker.regional['fr'].monthNamesShort,
      longMonths: $.datepicker.regional['fr'].monthNames,
      dateFormat: 'd F y'
    });

  expect(53);

  // default format
  same($calendar.weekCalendar('formatDate', new Date('Apr 20 2011 14:50:32 GMT+0200')), '20 Avril 11');
  // force format
  same($calendar.weekCalendar('formatDate', new Date('Apr 20 2011 14:50:32 GMT+0200'), 'l j M Y'), 'Mercredi 20 Avril 2011');


  //Barbarian test
  $calendar.weekCalendar('option',{
                              dateFormat: 'd D j l N S w F m M n t Y y a A g G h H i s O P Z r U',
                              firstDayOfWeek: $.datepicker.regional['en-GB'].firstDay,
                              shortDays: $.datepicker.regional['en-GB'].dayNamesShort,
                              longDays: $.datepicker.regional['en-GB'].dayNames,
                              shortMonths: $.datepicker.regional['en-GB'].monthNamesShort,
                              longMonths: $.datepicker.regional['en-GB'].monthNames
                          }); 
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200')), '01 Fri 1 Friday 5 st 5 April 04 Apr 4 30 2011 11 pm PM 2 14 02 14 50 32 +0200 +02:00 7200 Fri Apr 01 2011 14:50:32 GMT+0200 (CEST) 1301662232'); 

//Day

  //test 'd' - 01 to 31 Day
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'd'), '01');
  same($calendar.weekCalendar('formatDate', new Date('Apr 10 2011 14:50:32 GMT+0200'), 'd'), '10');

  //test 'j' - 1 to 31 Day
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'j'), '1');

  //test 'D' Three letter Day
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'D'), 'Fri');

  //test 'l' - Full Text Day
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'l'), 'Friday');

  //test 'N' - number of the day in the week
  same($calendar.weekCalendar('formatDate', new Date('Apr 18 2011 14:50:32 GMT+0200'), 'N'), '1');
  same($calendar.weekCalendar('formatDate', new Date('Apr 19 2011 14:50:32 GMT+0200'), 'N'), '2');
  same($calendar.weekCalendar('formatDate', new Date('Apr 20 2011 14:50:32 GMT+0200'), 'N'), '3');
  same($calendar.weekCalendar('formatDate', new Date('Apr 21 2011 14:50:32 GMT+0200'), 'N'), '4');
  same($calendar.weekCalendar('formatDate', new Date('Apr 22 2011 14:50:32 GMT+0200'), 'N'), '5');
  same($calendar.weekCalendar('formatDate', new Date('Apr 23 2011 14:50:32 GMT+0200'), 'N'), '6');
  same($calendar.weekCalendar('formatDate', new Date('Apr 24 2011 14:50:32 GMT+0200'), 'N'), '7');

  //test 'S' - Ordinal suffix
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'S'), 'st');

  //test 'w' - Numeric representation
  same($calendar.weekCalendar('formatDate', new Date('Apr 18 2011 14:50:32 GMT+0200'), 'w'), '1');
  same($calendar.weekCalendar('formatDate', new Date('Apr 19 2011 14:50:32 GMT+0200'), 'w'), '2');
  same($calendar.weekCalendar('formatDate', new Date('Apr 20 2011 14:50:32 GMT+0200'), 'w'), '3');
  same($calendar.weekCalendar('formatDate', new Date('Apr 21 2011 14:50:32 GMT+0200'), 'w'), '4');
  same($calendar.weekCalendar('formatDate', new Date('Apr 22 2011 14:50:32 GMT+0200'), 'w'), '5');
  same($calendar.weekCalendar('formatDate', new Date('Apr 23 2011 14:50:32 GMT+0200'), 'w'), '6');
  same($calendar.weekCalendar('formatDate', new Date('Apr 24 2011 14:50:32 GMT+0200'), 'w'), '0');

//Month

  //test 'F' - Full Text
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'F'), 'April');

  //test 'm' - 01 to 12
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'm'), '04');

  //test 'M' -Three letter
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'M'), 'Apr');

  //test 'n' - 1 to 12
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'n'), '4');
  same($calendar.weekCalendar('formatDate', new Date('Nov 01 2011 14:50:32 GMT+0200'), 'n'), '11');

  //test 't' -number of the day in month
    same($calendar.weekCalendar('formatDate', new Date('Feb 01 2011 14:50:32 GMT+0200'), 't'), '28');
    same($calendar.weekCalendar('formatDate', new Date('Feb 01 1900 14:50:32 GMT+0200'), 't'), '28');
    same($calendar.weekCalendar('formatDate', new Date('Feb 01 2000 14:50:32 GMT+0200'), 't'), '29');
    same($calendar.weekCalendar('formatDate', new Date('Feb 01 2004 14:50:32 GMT+0200'), 't'), '29');
    same($calendar.weekCalendar('formatDate', new Date('Jun 01 2011 14:50:32 GMT+0200'), 't'), '30');
    same($calendar.weekCalendar('formatDate', new Date('May 01 2011 14:50:32 GMT+0200'), 't'), '31');


//Year

  //test 'Y' - full Year
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'Y'), '2011');

  //test 'y' - short Year
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'y'), '11');

//Time
  //test 'a' - am or pm
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'a'), 'pm');
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 11:50:32 GMT+0200'), 'a'), 'am');


  //test 'A' - AM or PM
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'A'), 'PM');
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 11:50:32 GMT+0200'), 'A'), 'AM');

  //test 'g' and 'G' - 12h&24 format-(1 to 12) and (0 to 23)
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'g'), '2');
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'G'), '14');
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 00:50:32 GMT+0200'), 'G'), '0');

  //test 'h' and 'H' - 12h&24 format-(01 to 12) and (00 to 23)
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'h'), '02');
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'H'), '14');
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 00:50:32 GMT+0200'), 'H'), '00');

  //test 'i' - minute (00 to 59)
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:00:32 GMT+0200'), 'i'), '00');

  //test 's' - sec (00 to 59)
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:00:32 GMT+0200'), 's'), '32');

//Timezone
  //test 'O' - Greenwitch difference (+0200)
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:00:32 GMT+0200'), 'O'), '+0200');

  //test 'P' - Greenwitch difference (+02:00)
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:00:32 GMT+0200'), 'P'), '+02:00');

  //test 'Z' - Greenwitch difference in sec (+0200)
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:00:32 GMT+0200'), 'Z'), '7200');

//FullTime

  //test 'r' - RFC2822 : Thu, 21 Dec 2000 16:01:07 +0200
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:00:32 GMT+0200'), 'r'), 'Fri Apr 01 2011 14:00:32 GMT+0200 (CEST)');

  //test 'U'- TimeStamp (since 1/1/1970)
  same($calendar.weekCalendar('formatDate', new Date('Apr 01 2011 14:50:32 GMT+0200'), 'U'), '1301662232');

});

test("issue # 60: eventHeader doesn't take care of use24Hour option", function() {
  var $calendar = $('#calendar');
  $calendar.weekCalendar({
    'use24Hour': false,
    'timeSeparator': ' -> '
  });
  //get local timezone:
  var TZ = formatTimeZone();

  expect(5);
  var _events = [{
      'id': 1,
      'start': '2009-05-10T13:15:00.000' + TZ,
      'end': '2009-05-10T14:15:00.000' + TZ,
      'title': 'Lunch with Mike'}, {
      'id': 1,
      'start': '2009-05-10T10:15:00.000' + TZ,
      'end': '2009-05-10T12:15:00.000' + TZ,
      'title': 'Lunch with Mike'}
      ];
  // trick to call private function
  var _privateWeekCalendar = $calendar.data('weekCalendar');
  _events = _privateWeekCalendar._cleanEvents.call(_privateWeekCalendar, _events);

  var eventHeaderFunc = $calendar.weekCalendar('option', 'eventHeader');

  ok($.isFunction(eventHeaderFunc), 'check eventHeader is a function');

  // test without use24Hour option
  same(eventHeaderFunc(_events[0], $calendar), '01:15 pm -> 02:15 pm');
  same(eventHeaderFunc(_events[1], $calendar), '10:15 am -> 12:15 pm');

  // now force use24Hour to true
  $calendar.weekCalendar('option', 'use24Hour', true);

  same(eventHeaderFunc(_events[0], $calendar), '13:15 -> 14:15');
  same(eventHeaderFunc(_events[1], $calendar), '10:15 -> 12:15');

});
