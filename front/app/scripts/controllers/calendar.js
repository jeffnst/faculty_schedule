'use strict';

function CalendarCtrl($compile, uiCalendarConfig, $uibModal) {

  var vm = this;

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  vm.changeTo = 'Hungarian';

  vm.eventSource = {
    url: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic',
    className: 'gcal-event',
    currentTimezone: 'America/Chicago'
  };

  vm.events = [{
    title: 'All Day Event',
    start: new Date(y, m, 1),
    listColor: 'danger',
    className: ['bg-danger']
  }, {
    title: 'Long Event',
    start: new Date(y, m, d - 5),
    end: new Date(y, m, d - 2),
    listColor: 'success',
    className: ['bg-success']
  }, {
    id: 999,
    title: 'Repeating Event',
    start: new Date(y, m, d - 3, 16, 0),
    allDay: false,
    listColor: 'info',
    className: ['bg-info']
  }, {
    id: 999,
    title: 'Repeating Event',
    start: new Date(y, m, d + 4, 16, 0),
    allDay: false,
    listColor: 'primary',
    className: ['bg-primary']
  }, {
    title: 'Birthday Party',
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false,
    listColor: 'default',
    className: ['bg-default']
  }, {
    title: 'Click for Google',
    start: new Date(y, m, 28),
    end: new Date(y, m, 29),
    url: 'http://google.com/',
    listColor: 'warning',
    className: ['bg-warning']
  }];

  vm.eventsF = function(start, end, timezone, callback) {
    var s = new Date(start).getTime() / 1000;
    var e = new Date(end).getTime() / 1000;
    var m = new Date(start).getMonth();
    var events = [{
      title: 'Feed Me ' + m,
      start: s + (50000),
      end: s + (100000),
      allDay: false,
      className: ['customFeed']
    }];
    callback(events);
  };

  vm.calEventsExt = {
    events: [{
      type: 'party',
      title: 'Lunch',
      start: new Date(y, m, d, 12, 0),
      end: new Date(y, m, d, 14, 0),
      allDay: false,
      listColor: 'primary',
      className: ['bg-primary']
    }, {
      type: 'party',
      title: 'Lunch 2',
      start: new Date(y, m, d, 12, 0),
      end: new Date(y, m, d, 14, 0),
      allDay: false,
      listColor: 'primary',
      className: ['bg-primary']
    }, {
      type: 'party',
      title: 'Click for Google',
      start: new Date(y, m, 28),
      end: new Date(y, m, 29),
      url: 'http://google.com/',
      listColor: 'primary',
      className: ['bg-primary']
    }]
  };

  /* add and removes an event source of choice */
  vm.addRemoveEventSource = function(sources, source) {
    var canAdd = 0;
    angular.forEach(sources, function(value, key) {
      if (sources[key] === source) {
        sources.splice(key, 1);
        canAdd = 1;
      }
    });
    if (canAdd === 0) {
      sources.push(source);
    }
  };

  /* add custom event*/
  vm.addEvent = function() {
    vm.events.push({
      title: 'Open Sesame',
      start: new Date(y, m, 28),
      className: ['bg-primary']
    });
  };

  /* remove event */
  vm.remove = function(index) {
    vm.events.splice(index, 1);
  };

  /* Change View */
  vm.changeView = function(view, calendar) {
    uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
  };

  /* Change View */
  vm.renderCalender = function(calendar) {
    if (uiCalendarConfig.calendars[calendar]) {
      uiCalendarConfig.calendars[calendar].fullCalendar('render');
    }
  };

  /* Render Tooltip */
  vm.eventRender = function(event, element, view) {
    element.attr({
      'uib-tooltip': event.title,
      'uib-tooltip-append-to-body': true
    });
    $compile(element)(vm);
  };

  /* config object */
  vm.uiConfig = {
    calendar: {
      editable: true,
      contentHeight: 520,
      header: {
        left: 'title',
        center: 'month,agendaWeek,agendaDay',
        right: 'today prev,next'
      },
      buttonIcons: {
        prev: ' fa fa-caret-left',
        next: ' fa fa-caret-right'
      },
      droppable: true,
      axisFormat: 'h:mm',
      columnFormat: {
        month: 'dddd',
        week: 'ddd M/D',
        day: 'dddd M/d',
        agendaDay: 'dddd D'
      },
      allDaySlot: false,
      eventDrop: vm.alertOnDrop,
      eventResize: vm.eventResize,
      viewRender: function(view, element) {
        $('.fc-button-group').addClass('btn-group');
        $('.fc-button').addClass('btn');
      }
    }
  };

  /* event sources array*/
  vm.eventSources = [vm.events];

  /*Calendar sidebar modal*/
  vm.open = function(size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'calendarModal.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: 'calevents',
      windowClass: 'sidebar-modal',
      resolve: {
        events: function() {
          return vm.events;
        }
      }
    });
  };
}

function ModalInstanceCtrl($uibModalInstance, events) {
  var vm = this;
  vm.events = events;
  vm.ok = function() {
    $uibModalInstance.close(vm.events);
  };
  vm.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
}
angular.module('app').controller('ModalInstanceCtrl', ['$uibModalInstance', 'events', ModalInstanceCtrl]).controller('CalendarCtrl', ['$compile', 'uiCalendarConfig', '$uibModal', CalendarCtrl]);