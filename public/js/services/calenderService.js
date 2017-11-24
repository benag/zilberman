angular.module('ganim').factory('calenderService',function($state, $timeout, $location, eventsService, $rootScope ){
    return {
        itemArray:['dd','dqwd'],
        $calendar : '',
        //today: new Date(),
        y : (new Date()).getFullYear(),
        m : (new Date()).getMonth(),
        d : (new Date()).getDate(),
        events:[],
        transferData: function(data){
            for (var i =0 ;i <  data.length; i++){
                var item = data[i];
                item.id = item._id;
                item.allDay = false;
                item.className = 'event-rose';
            }
            return data;
        },
        refreshEvents: function(room){
            var _this = this;
            return eventsService.getEvents(room)
            .then(function(events){
                _this.events = _this.transferData(events.data);
            }).catch(function(err){console.log(err)})

        },
        addZero: function (i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },
        getTime: function(d) {
            var h = this.addZero(d.getHours());
            var m = this.addZero(d.getMinutes());
            var s = this.addZero(d.getSeconds());
            return  h + ":" + m + ":" + s;
        },
        updateEvent: function(selection) {
            let room = selection.room.selected;
            let member = selection.person;
            //selection.time.start._d.setHours(selection.time.startTime.getHours());
            //selection.time.end._d.setHours(selection.time.endTime.getHours());
            //selection.time.start._d.setMinutes(selection.time.startTime.getMinutes());
            //selection.time.end._d.setDate(selection.time.end._d.getDate()-1);
            //selection.time.end._d.setMinutes(selection.time.endTime.getMinutes());

            eventsService.updateEvent(selection.id,member._id, selection.time.start,selection.time.end, room._id, selection.title)
            .then(function(event){
                $state.reload();
            })
        },
        addEvent: function(selection){
            _this = this;
            let member = selection.person;
            selection.time.start._d.setHours(selection.time.startTime.getHours());
            selection.time.end._d.setHours(selection.time.endTime.getHours());
            selection.time.start._d.setMinutes(selection.time.startTime.getMinutes());
            selection.time.end._d.setDate(selection.time.end._d.getDate()-1);
            selection.time.end._d.setMinutes(selection.time.endTime.getMinutes());
            var title = member.firstName;
            let min =
            eventsService.addEvent (member._id, selection.time.start._d,selection.time.end._d, _this.room._id, title)
            .then(function(event){
                eventData = {
                    title: title,
                    start: selection.time.start._d,
                    end: selection.time.end._d,
                    eventId: event.data.payload.eventId
                };
                this.$calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                this.$calendar.fullCalendar('unselect');
            }).catch(function(err){
                console.log(err);
            })

        },

        initCalender: function(meetupsCtrl, room){
            _this = this;
            _this.room = room;
            this.meetupCtrl = meetupsCtrl;
            _this.refreshEvents(room)
            .then(function(){
                $calendar = $('#fullCalendar');
                this.$calendar = $calendar;
                today = new Date();
                y = today.getFullYear();
                m = today.getMonth();
                d = today.getDate();

                $calendar.fullCalendar({
                    viewRender: function(view, element) {
                        // We make sure that we activate the perfect scrollbar when the view isn't on Month
                        if (view.name != 'month'){
                            $(element).find('.fc-scroller').perfectScrollbar();
                        }
                    },
                    header: {
                        left: 'title',
                        center: 'month,agendaWeek,agendaDay',
                        right: 'prev,next,today'
                    },
                    defaultDate: today,
                    selectable: true,
                    fullDay:true,
                    selectHelper: true,
                    views: {
                        month: { // name of view
                            titleFormat: 'MMMM YYYY'
                            // other view-specific options here
                        },
                        week: {
                            titleFormat: " MMMM D YYYY"
                        },
                        day: {
                            titleFormat: 'D MMM, YYYY'
                        }
                    },

                    select: function(start, end) {
                        meetupsCtrl.open(start, end );

                    },
                    editable: true,
                    eventLimit: true, // allow "more" link when too many events


                    // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
                    events: _this.events,

                    eventClick: function(calEvent, jsEvent, view) {
                        console.log(calEvent);

                        $rootScope.$on('delete_event', function(event, args){
                            eventsService.removeEvent(args.id)
                            .then( function() {
                                $state.reload();
                            }).catch(function(err){
                                console.log(err);
                            })
                            //_this.$calendar.fullCalendar('removeEvents' [ args.id]); // stick? = true
                        });
                        eventsService.getEvent(calEvent._id)
                        .then( function(res){
                            meetupsCtrl.edit(res.data.payload, calEvent);
                        }).catch( function(err){
                            alert(err);
                        });

                        // change the border color just for fun
                        $(this).css('border-color', 'red');

                    }

                });

            })
        }

    }


});

