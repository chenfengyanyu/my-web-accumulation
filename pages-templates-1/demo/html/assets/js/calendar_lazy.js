/* ============================================================
 * Calendar
 * This is a Demo App that was created using Pages Calendar Plugin
 * We have demonstrated a few function that are useful in creating
 * a custom calendar. Please refer docs for more information
 * ============================================================ */

(function($) {

    'use strict';

    $(document).ready(function() {
        var AJAX = null;
        var selectedEvent;
        $('#myCalendar').pagescalendar({
            now:"2015-11-23", //Setting a date - remove this;
            onViewRenderComplete:function(range){
                //Remeber to formate your date
                var start = range.start.format();
                var end = range.end.format();
                if ($("body").hasClass('pending') ) {
                    return;
                }
                $.ajax({
                    type: "GET",
                    url: "http://revox.io/json/events.json",
                    data: "",
                    success: function(data) {
                        $("#myCalendar").pagescalendar("setState","loaded");
                        $("body").removeClass('pending');
                        $("#myCalendar").pagescalendar("removeAllEvents");
                        $("#myCalendar").pagescalendar("addEvents",data);
                    },
                    error: function (ajaxContext) {
                        $("#myCalendar").pagescalendar("error",ajaxContext.status+": Something horribly went wrong :(" );
                        $("body").removeClass('pending');
                    }
                });
            },
            onEventClick: function(event) {
                //Open Pages Custom Quick View
                if (!$('#calendar-event').hasClass('open'))
                    $('#calendar-event').addClass('open');


                selectedEvent = event;
                setEventDetailsToForm(selectedEvent);
            },
            onEventDragComplete: function(event) {
                selectedEvent = event;
                setEventDetailsToForm(selectedEvent);

            },
            onEventResizeComplete: function(event) {
                selectedEvent = event;
                setEventDetailsToForm(selectedEvent);
            },
            onTimeSlotDblClick: function(timeSlot) {
                //Adding a new Event on Slot Double Click
                $('#calendar-event').removeClass('open');
                var newEvent = {
                    title: 'my new event',
                    class: 'bg-success-lighter',
                    start: timeSlot.date,
                    end: moment(timeSlot.date).add(1, 'hour').format(),
                    allDay: false,
                    other: {
                        //You can have your custom list of attributes here
                        note: 'test'
                    }
                };
                selectedEvent = newEvent;
                $('#myCalendar').pagescalendar('addEvent', newEvent);
                setEventDetailsToForm(selectedEvent);
            },
            onDateChange:function(range){
                $("#myCalendar").pagescalendar("setState","loaded");
                //Remeber to formate your date
                var start = range.start.format();
                var end = range.end.format();
                //console.log(start);
                //console.log(end);
                if ($("body").hasClass('pending') ) {
                    return;
                }

                $("body").addClass('pending');
                $("#myCalendar").pagescalendar("setState","loading");
                $.ajax({
                    type: "GET",
                    url: "http://revox.io/json/events.json",
                    data: "",
                    success: function(data) {
                        $("#myCalendar").pagescalendar("setState","loaded");
                        $("body").removeClass('pending');
                        $("#myCalendar").pagescalendar("removeAllEvents");
                        $("#myCalendar").pagescalendar("addEvents",data);
                    },
                    error: function (ajaxContext) {
                        $("#myCalendar").pagescalendar("error",ajaxContext.status+": Something horribly went wrong :(" );
                        $("body").removeClass('pending');
                    }
                });
            }
        });

        // Some Other Public Methods That can be Use are below \
        //console.log($('body').pagescalendar('getEvents'))
        //get the value of a property
        //console.log($('body').pagescalendar('getDate','MMMM'));

        function setEventDetailsToForm(event) {
            $('#eventIndex').val();
            $('#txtEventName').val();
            $('#txtEventCode').val();
            $('#txtEventLocation').val();
            //Show Event date
            $('#event-date').html(moment(event.start).format('MMM, D dddd'));

            $('#lblfromTime').html(moment(event.start).format('h:mm A'));
            $('#lbltoTime').html(moment(event.end).format('H:mm A'));

            //Load Event Data To Text Field
            $('#eventIndex').val(event.index);
            $('#txtEventName').val(event.title);
            $('#txtEventCode').val(event.other.code);
            $('#txtEventLocation').val(event.other.location);
        }

        $('#eventSave').on('click', function() {
            selectedEvent.title = $('#txtEventName').val();

            //You can add Any thing inside "other" object and it will get save inside the plugin.
            //Refer it back using the same name other.your_custom_attribute

            selectedEvent.other.code = $('#txtEventCode').val();
            selectedEvent.other.location = $('#txtEventLocation').val();

            $('#myCalendar').pagescalendar('updateEvent',selectedEvent);

            $('#calendar-event').removeClass('open');
        });

        $('#eventDelete').on('click', function() {
            $('#myCalendar').pagescalendar('removeEvent', $('#eventIndex').val());
            $('#calendar-event').removeClass('open');
        });
    });

})(window.jQuery);