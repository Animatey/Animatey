var colours = []
var demo_colours = ['#360745', '#D61C59', '#E7D84B', '#EFEAC5', '#1B8798']

var svgns = "http://www.w3.org/2000/svg";                      //set the standard SVG namespace for reuse
var xlinkns = "http://www.w3.org/1999/xlink";                  //set the standard SVG xlink for reuse
var svg_element = document.getElementById('svg_container')
var offset = 28; //Hard coded offset, this will be user configurable later

function update_text_display(){
    svg_element = document.getElementById('svg_container')
    var new_text = document.getElementById('animation_text_input').value;

    svg_text_element = document.getElementById('animation_text');
    document.getElementById('text_group').innerHTML = ""; //clear the text
    num_colours = colours.length           //fixing this number to recreate the example on codepen

    var selected_font = document.getElementById('font_select').value;
    console.log('here');

    for (var colour_num = 0; colour_num < num_colours; colour_num++){
        var svg_text_element = document.createElementNS(svgns, "text");    //create an svg text element that the user's text will be put into
        document.getElementById('text_group').append(svg_text_element); 
        svg_text_element.innerHTML = new_text;
        svg_text_element.setAttribute("class", "text--line text-copy " + selected_font);    //add css class  
    }
}

function update_elastic_colours(){

    var new_colour = document.getElementById('elastic_colour_input').value
    colours.push(new_colour);
    update_text_display();
    num_colours = document.getElementsByClassName('text-copy').length;

    colour_swatches = document.getElementsByClassName('elastic_colour_sample');
    colour_palette = document.getElementById('colour_palette');
    colour_palette.innerHTML = ""; 

    if (new_colour == 'demo_colours' || new_colour == 'demo'){
        num_colours = 5

        for (var i = 0; i < num_colours; i++){
            var new_colour_swatch = document.createElement('div');
            new_colour_swatch.style.backgroundColor = demo_colours[i];
            new_colour_swatch.setAttribute('class', 'elastic_colour_sample');
            colour_palette.append(new_colour_swatch);
            document.getElementsByClassName('text-copy')[i].style.stroke = demo_colours[i];
            console.log(i);
        }
    } else {

        for (var i = 0; i < num_colours; i++){
            var new_colour_swatch = document.createElement('div');
            new_colour_swatch.style.backgroundColor = colours[i];
            new_colour_swatch.setAttribute('class', 'elastic_colour_sample');
            colour_palette.append(new_colour_swatch);
            document.getElementsByClassName('text-copy')[i].style.stroke = colours[i];
        }

        /*Update the offsets*/
        for (var i = 0; i < num_colours; i++){
            document.getElementsByClassName('text-copy')[i].style["stroke-dashoffset"] = String(i*offset)+'%';
            console.log('Num colours: ' + num_colours);
        }
    }
}

function update_elastic_looping(){
    var check_box = document.getElementById('infinite_loop_checkbox');
    var input_box = document.getElementById('loop_count_input');
    var checked_state = check_box.checked;
    console.log(checked_state);
    if (checked_state){
        input_box.disabled = true;
    } else {
        console.log('ayy');
        input_box.disabled = false;
        update_elastic_loop_count();
    }
}

function update_elastic_loop_count(){
    console.log('here');
    var check_box = document.getElementById('infinite_loop_checkbox');
    var input_box = document.getElementById('loop_count_input');
    var checked_state = check_box.checked;
    if (checked_state){
        var new_animation_loop_count = "infinite"
        } else {
            var new_animation_loop_count = input_box.value;
        }
    num_colours = document.getElementsByClassName('text-copy').length
    for (var i = 0; i < num_colours; i++){
        document.getElementsByClassName('text-copy')[i].style.animationIterationCount = new_animation_loop_count;
        console.log(document.getElementsByClassName('text-copy')[i].style['animation-iteration-count'])
    }
}

function update_elastic_easing(){
    var easing_select_box = document.getElementById("elastic_easings_select");
    var new_easing = easing_select_box.options[easing_select_box.selectedIndex].value;
    num_colours = document.getElementsByClassName('text-copy').length
    for (var i = 0; i < num_colours; i++){
        document.getElementsByClassName('text-copy')[i].style["animation-timing-function"] = new_easing
    }
}

function update_elastic_speed(){
    var new_speed = document.getElementById('elastic_duration_slider').value;
    console.log(new_speed);
    num_colours = document.getElementsByClassName('text-copy').length
    for (var i = 0; i < num_colours; i++){
        document.getElementsByClassName('text-copy')[i].style["-webkit-animation-duration"] = String(new_speed)+"s"
    }
}

function download_svg(){
    var svg_innerHTML = document.getElementById("svg_wrapper").innerHTML;
    var d = new Date();
    download("animatey_svg_"+d.getTime()+".svg", svg_innerHTML);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
} 

//Examples of cool shit
//document.getElementsByClassName('text-copy')[0].style["-webkit-animation-duration"] = "3s" //changes the speed of one part of the animaton