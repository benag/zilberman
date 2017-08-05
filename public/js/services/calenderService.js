angular.module('ganim').factory('calenderService',function($state, $timeout, $location ){
    return {
        itemArray:['dd','dqwd'],
        $calendar : '',
        //today: new Date(),
        y : (new Date()).getFullYear(),
        m : (new Date()).getMonth(),
        d : (new Date()).getDate(),
        events:[
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(),
                allDay: false,
                className: 'event-rose'
            }
            ],
        getEvents: function(){
            console.log(this.events);
            console.log(this.y, this.m, this.d)
            return this.events;
        },
        initCalender: function(meetupsCtrl){
            _this = this;
            this.meetupCtrl = meetupsCtrl;
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
                    meetupsCtrl.open();
                    // on select we show the Sweet Alert modal with an input
                    //swal({
                    //    title: 'Create an Event',
                    //    //html: '<div class="form-group">' +
                    //    //'<input class="form-control" placeholder="Event Title" id="input-field">' +
                    //    //'</div>',
                    //    html:_this.selectHtml,
                    //    showCancelButton: true,
                    //    confirmButtonClass: 'btn btn-success',
                    //    cancelButtonClass: 'btn btn-danger',
                    //    buttonsStyling: false
                    //}).then(function(result) {
                    //
                    //    var eventData;
                    //    event_title = $('#input-field').val();
                    //
                    //    if (event_title) {
                    //        eventData = {
                    //            title: event_title,
                    //            start: start,
                    //            end: end
                    //        };
                    //        $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                    //    }
                    //
                    //    $calendar.fullCalendar('unselect');
                    //
                    //});
                },
                editable: true,
                eventLimit: true, // allow "more" link when too many events


                // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
                events: _this.events,

                eventClick: function(calEvent, jsEvent, view) {

                    alert('Event: ' + calEvent.title);
                    alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                    alert('View: ' + view.name);

                    // change the border color just for fun
                    $(this).css('border-color', 'red');

                }

            });

        }


    }


});

