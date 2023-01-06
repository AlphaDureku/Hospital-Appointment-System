$('.datepicker-here').datepicker({
    language: 'en',
    inline: true
})

$.get("http://localhost:3000/book-appointment/get-schedule", function(data, status) {
    let enabledDays = []
    data.forEach(res => {
        enabledDays.push(res.date2)
    })

    renderCalendar(enabledDays);
});

const renderCalendar = (enabledDays) => {

    $('.datepicker-here').datepicker({
        dateFormat: 'yyyy/mm/dd',
        onSelect() {
            $.get("http://localhost:3000/book-appointment/get-schedule2", function(data, status) {
                $('#table').empty()
                $('#drop-down').children().not(':first').remove();
                data.forEach(res => {
                    if ($('#date').val() == res.date2) {
                        $('#table').append(`
                        <tr>
                        <td>${res.date}</td>
                        <td>${res.day}</td>
                        <td>${res.start} - ${res.end}</td>
                        </tr>`)
                        $('#drop-down').append(`<option value="${res.doctor_schedule_ID}">${res.date} ${res.day} ${res.start}</option>`)
                    }
                })

            });
        },

        onRenderCell: function onRenderCell(date, cellType) {
            if (cellType == 'day') {
                var day = (date.getFullYear() + '-' + (('0' + (date.getMonth() + 1)).slice(-2)) + '-' + (('0' + date.getDate()).slice(-2)));
                var isDisabled = enabledDays.indexOf(day) == -1;
                return {
                    disabled: isDisabled
                }
            }
        }
    })

}