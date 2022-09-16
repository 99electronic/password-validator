/*
pass1 & pass2 are password inputs with class passwords on both
*/
$(function() {
    let type = 0;//letters/capital letters/numbers and special char required - SEE SWITCH ON row 28
    $('.passwords')
        .on('input change', function() {
            validatePassword($('#pass1'),$('#pass2'), type);
        });
});

let validatePassword = function(pass1, pass2, type) {
    let e = {}
    let p1 = pass1.val();
    let p2 = pass2.val();
    //validate length
    e.l = p1.length > 7 && p1.length < 64?1:0;//len 8-64
    //validate letter
    e.a = p1.match(/[a-z]/)?1:0;//at least one letter
    //validate capital letter
    e.b = p1.match(/[A-Z]/)?1:0;//at least one capital letter
    //validate letter or capital letter
    e.c = p1.match(/[a-zA-Z]/)?1:0;//at least one capital letter
    //validate number
    e.n = p1.match(/\d/)?1:0;//at least one number
    //special character
    e.s = p1.match(/[\^@$!%*?&\[\]()\-_=+`~.{}\\,:;|/]/)?1:0;//at least one of those
    //match passwords
    e.m = (p1 === p2 && (p1 !== ''))?1:0;
    //cognito passwords options switch
    switch (type) {
        case 0:
            //letter number capital letter and special char
            e.valid = (e.l + e.a + e.b + e.n + e.s) === 5;
            delete e.c;
            break;
        case 1:
            //letter number capital letter
            e.valid = (e.l + e.a + e.b + e.n) === 4;
            delete e.s;
            delete e.c;
            break;
        case 2:
            //letter and number
            e.valid = (e.l + e.c + e.n) === 3;
            delete e.s;
            delete e.a;
            delete e.b;
            break;
    }
    //DEBUGGING RESULTS-START
    console.log(JSON.stringify(e));
    //DEBUGGING RESULT-END
    displayValidation(e, 'p-err', pass1, pass2);
}

let displayValidation = function(e, elm, pass1, pass2) {
    let i = 0;
    $.each(e, function(key, pass) {
        //count valid passes
        i = i + pass;
        //set style of each sub-errors
        $('#' + elm + '-' + key)
            .css('color', pass?'green':'gray');
    });
    //hide results if nothing was filled (optional, if not used, the pass counter is not needed)
    $('.' + elm + '-container')
        .css('visibility',i===0?'hidden':'visible');
    //change input style when valid password
    pass1
        .css('border','2px solid ' + (e.valid?'green':'gray'));
    //change input style when matching password
    pass2
        .css('border','2px solid ' + (e.m?'green':'gray'));
    //change main button style/property when valid/invalid format/match
    $('#submit')
         .attr('disabled', !(e.valid && e.m));

}
