var app = {

    Homepage_typewriter: function() {
        var _CONTENT = ["I'm the African Elephant", "I'm the Oahu Treesnail", "I'm the Bornean Orangutan", "I'm the Cross River Gorilla", "I'm the Eastern Lowland Gorilla", "I'm the Hawksbill Turtle", "I'm the Javan Rhino", "I'm the Orangutan", "I'm the Saola", "I'm the Sumatran Elephant", "I'm the Sumatran Orangutan", "I'm the Sumatran Rhino", "I'm the Sunda Tiger", "I'm the Vaquita", "I'm the Western Lowland Gorilla", "I'm the Yangtze Finless Porpoise", "I'm the African Wild Dog", "I'm the Asian Elephant", "I'm the Back-footed Ferret", "I'm the Blue Whale", "I'm the Bluefin Tuna", "I'm the Bonobo", "I'm the Humphead Wrasse", "I'm the Green Turtle"];
            // Current sentence being processed
            var _PART = 0;      
            // Character number of the current sentence being processed 
            var _PART_INDEX = 0;
            // Holds the handle returned from setInterval
            var _INTERVAL_VAL;           
            // Element that holds the text
            var _ELEMENT = document.querySelector("#text");          
            // Implements typing effect
            function Type() { 
                var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
                _ELEMENT.innerHTML = text;
                _PART_INDEX++;           
                // If full sentence has been displayed then start to delete the sentence after some time
                if(text === _CONTENT[_PART]) {
                    clearInterval(_INTERVAL_VAL);
                    setTimeout(function() {
                        _INTERVAL_VAL = setInterval(Delete, 50);
                    }, 1000);
                }
            }          
            // Implements deleting effect
            function Delete() {
                var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
                _ELEMENT.innerHTML = text;
                _PART_INDEX--;           
                // If sentence has been deleted then start to display the next sentence
                if(text === '') {
                    clearInterval(_INTERVAL_VAL);            
                    // If last sentence then display the first one, else move to the next
                    if(_PART == (_CONTENT.length - 1))
                        _PART = 0;
                    else
                        _PART++;
                    _PART_INDEX = 0;           
                    // Start to display the next sentence after some time
                    setTimeout(function() {
                        _INTERVAL_VAL = setInterval(Type, 100);
                    }, 200);
                }
            }
            // Start the typing effect on load
            _INTERVAL_VAL = setInterval(Type, 100); 
    },

    buttonscroll:function() {
        $(function() {
            $('a[href*=#]').on('click', function(e) {
              e.preventDefault();
              $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
            });
          });
    },

    
    container_scroll:function() {
        var speciesContainer = $('.contained')
        $(speciesContainer).on('click', 'a', function () {
        var scrollTo = $(this);
            speciesContainer.animate({
                scrollTop: scrollTo.offset().top - speciesContainer.offset().top + speciesContainer.scrollTop()
            });
        });
    },

    container_scroll_threats:function() {
        var speciesContainer = $('.contained2')
        $(speciesContainer).on('click', 'a', function () {
        var scrollTo = $(this);
            speciesContainer.animate({
                scrollTop: scrollTo.offset().top - speciesContainer.offset().top + speciesContainer.scrollTop()
            });
        });
    },
    

    scrolling: function() {
        $('.scroll_item').on('click', function() {
            var elem   = $('#' + $(this).data('page')),
                scroll = elem.offset().top;
            
            $('body, html').animate({scrollTop : scroll}, 1000);
            
            $(this).addClass('scroll_item_active')
                   .siblings('.scroll_item_active')
                   .removeClass('scroll_item_active');
        });
        
        $(window).on('scroll', function(e) {
            var elems    = $('#second, #third'),
                scrolled = $(this).scrollTop();
            
            var dataPage = elems.filter(function() {
                return $(this).offset().top + ($(this).height() / 2) >= scrolled;
            }).first();
        
            $('.scroll_item[data-page="'+dataPage.prop('id')+'"]').addClass('scroll_item_active')
                             .siblings('.scroll_item_active')
                             .removeClass('scroll_item_active');
        }).trigger('scroll');
    },

    GetAnimal:function() {
        $.ajax({
            url: 'https://apiv3.iucnredlist.org/api/v3/species/page/0?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee'
          , type: 'json'
          , method: 'get'
          , error: function (err) { 
              console.log('it did not come through')
          }
          , success: function (data) {
              for (var i = 0; i < 100; i++) {
                  var idd = data.result[i].taxonid;
                  console.log(idd);
                  $.ajax({
                    url: 'https://apiv3.iucnredlist.org/api/v3/species/id/' + idd + '?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee',
                    type: 'json',
                    method: 'post',
                    error: function (err) { },
                    success: function (data) {
                        var sc_name = data.result[0].scientific_name;
                        var com_name = data.result[0].main_common_name;
                        var ani_class = data.result[0].class;
                        var name = data.name;
                        //const newArray = [];
                        console.log(idd, sc_name, com_name);
                        if (name && sc_name && com_name && ani_class !== null){
                            if (ani_class == "MAMMALIA"){
                                var mammal = '<div>' +name+'&nbsp;'+com_name+'</div><br/>';
                                $('#mammal').append(mammal);
                            } else if (ani_class == "REPTILIA") {
                                var reptile = '<div>' +name+'&nbsp;'+com_name+'</div><br/>';
                                $('#reptile').append(reptile);
                            } else if (ani_class == 'ACTINOPTERYGII'){
                                var actinop = '<div>' +name+'&nbsp;'+com_name+'</div><br/>';
                                $('#actinop').append(actinop);
                            }
                        } else {
                            console.log('FAIL');
                        }    
                        }
                    });

                }
            }
        });
    },

    dropping:function() {
        var dropdown = document.getElementsByClassName("dropdown-btn");
                var i;
                for (i = 0; i < dropdown.length; i++) {
                dropdown[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var dropdownContent = this.nextElementSibling;
                if (dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                } else {
                    dropdownContent.style.display = "block";
                }
                });
                }
    },


    GetThreats: function(SearchTerm) {
        //$("#animalbtn").click(
            //function(){
                //let input = $("#animal-name").val();
                //console.log(input);

                $.ajax({
                    url:'https://apiv3.iucnredlist.org/api/v3/species/id/' + SearchTerm+ '?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee',
                    type: 'json',
                    method: 'post',
                    error: function (err) { 
                        console.log('NOTHING');
                    },
                    success: function (data) {
                        var title_name = data.result[0].main_common_name;
                        document.getElementById('animal_namess').innerHTML = title_name;
                        var imageID = data.name;
                        if (SearchTerm == "257") {
                            document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/3/35/4803_white_sturgeon_swart_odfw_%284455050144%29.jpg')";
                        } else if (SearchTerm == "12392"){
                            document.body.style.backgroundImage = "url('https://i1.wp.com/africanelephantjournal.com/wp-content/uploads/2019/04/3ac2e367385a4a378fb5cf7fc58d8ebc.jpg?fit=1200%2C675&ssl=1')";
                        } else if (SearchTerm == "18"){
                            document.body.style.backgroundImage = "url('https://digital58.com.ve/site/wp-content/uploads/2017/05/Bolivian_vizcacha.jpg')";
                        } else if (SearchTerm =="137"){
                            document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/50/Lesser_short-nosed_fruit_bat_%28Cynopterus_brachyotis%29.jpg')";
                        } else if (SearchTerm =="139"){
                            document.body.style.backgroundImage = "url('https://proactivepestga.com/wp-content/uploads/2014/06/Q22010subwili21.jpg')";
                        } else if (SearchTerm == "138"){
                            document.body.style.backgroundImag = "url('https://animals.sandiegozoo.org/sites/default/files/2020-01/hero-rodrigues-fruit-bat.jpg')";
                        } else if (SearchTerm == "140") {
                            document.body.style.backgroundImage ="url('https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555432914/shape/mentalfloss/6jhkj634h.png')";
                        } else if (SearchTerm == "142") {
                            document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/58/b3/6d/58b36de6349d6f9c2c83539c368aceb8.jpg')";
                        } else if (SearchTerm == "219"){
                            document.body.style.backgroundImage = "url('https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/A-G/cheetah-watching.ngsversion.1396530528126.adapt.1900.1.jpg')";
                        } else if (SearchTerm == "220"){
                            document.body.style.backgroundImage = "url('https://media.mehrnews.com/d/2019/05/29/4/3141354.jpg')";
                        } else if (SearchTerm == "221") {
                            document.body.style.backgroundImage = "url('https://cdn6.dissolve.com/p/D246_28_310/D246_28_310_1200.jpg')";
                        } else if (SearchTerm == "263") {
                            document.body.style.backgroundImage = "url('https://live.staticflickr.com/1759/42345917831_afd6b12872_b.jpg')";
                        } else if (SearchTerm == "20") {
                            document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/1/1b/Arboreal_Alligator_Lizard_Abronia_graminea_2900px.jpg')";
                        } else if (SearchTerm == "76"){
                            document.body.style.backgroundImage = "url('https://www.joelsartore.com/assets/stock/ANI080/ANI080-00319-1920x1278.jpg')";
                        } else if (SearchTerm == "78"){
                            document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/29/ee/1a/29ee1a48906aa5100ac1027a84c420a9.jpg')";
                        } else if (SearchTerm == "75") {
                            document.body.style.backgroundImage = "url('https://s2r.iucnredlist.org/sis2_images/965140417.jpg')";
                        } else if (SearchTerm == "161") {
                            document.body.style.backgroundImage = "url('https://s2r.iucnredlist.org/sis2_images/1165349997.jpg')";
                        } else if (SearchTerm == "9") {
                            document.body.style.backgroundImage = "url('https://d2ouvy59p0dg6k.cloudfront.net/img/original/scr_112641.jpg')";
                        } else if (SearchTerm == "73"){
                            document.body.style.backgroundImage = "url('https://www.yarqon.cet.ac.il/uploads/2014/01/%D7%9C%D7%91%D7%A0%D7%95%D7%9F-%D7%94%D7%99%D7%A8%D7%A7%D7%95%D7%9F.jpg')";
                        } else if (SearchTerm == "79"){
                            document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/42/00/2c/42002c17487c833c713d0dd8d3c3711f.jpg')";
                        } else if (SearchTerm == "212") {
                            document.body.style.backgroundImage = "url('https://alchetron.com/cdn/acheilognathus-36aa97c9-9582-455c-bac3-7ad2ed5e560-resize-750.jpeg')"; 
                        } else if (SearchTerm == "213") {
                            document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Rhodeus_ocellatus_kurumeus1.jpg/1200px-Rhodeus_ocellatus_kurumeus1.jpg')";
                        } else if (SearchTerm == "222") {
                            document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/e9/33/0c/e9330c6abcd738cd9c0e284c5c13e967.jpg')";
                        } else if (SearchTerm == "223") {
                            document.body.style.backgroundImage = "url('https://www.vmcdn.ca/f/files/barrietoday/images/animals/sturgeon-adobestock_177398454.jpeg;w=1200;h=800;mode=crop')";
                        } else if (SearchTerm == "224") {
                            document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/7/7a/Acipenser_Naccarii_Acquario_Milano_2009.JPG')";
                        } else if (SearchTerm == "227") {
                            document.body.style.backgroundImage = "url('https://cdn.britannica.com/96/188396-050-3280FFB7/Sterlets-food-fishes-seas-Black-Caspian.jpg')";
                        } else if (SearchTerm == "225"){
                            document.body.style.backgroundImage = "url('https://www.dw.com/image/18177518_304.jpg')";
                        } else if (SearchTerm == "228") {
                            document.body.style.backgroundImage = "url('https://www.iucn.org/sites/dev/files/styles/850x500_no_menu_article/public/import/img/acipenser_sturio_2.jpg?itok=5qVtOMeq')";
                        } else if (SearchTerm == "229") {
                            document.body.style.backgroundImage = "url('https://ssl.c.photoshelter.com/img-get2/I00003x8tjap5el4/fit=1000x750/MLU-20130612-050844-02US.jpg')";
                        } else if (SearchTerm = "230") {
                            document.body.style.backgroundImage = "url('https://coastalanglermag.com/wp-content/uploads/2019/10/Atlantic-Sturgeon-02.jpg')";
                        } else if (SearchTerm == "231") {
                            document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/1/12/Sturgeon.jpg')";
                        } else if (SearchTerm == "234") {
                            document.body.style.backgroundImage = "url('https://www.nwcouncil.org/sites/default/files/styles/full/public/white-sturgeon-grover_6.jpg?itok=jqQHMtI1')";
                        } else if (SearchTerm == "232") {
                            document.body.style.backgroundImage = "url('https://www.tnaqua.org/images/uploads/our_animals/Russian_Sturgeon_1200.jpg')";
                        } else if (SearchTerm == "233"){
                            document.body.style.backgroundImage = "url('https://cdn2.webdamdb.com/1280_IQDFicMMmn81.jpg?1563920907')";
                        } else if (SearchTerm == "235") {
                            document.body.style.backgroundImage = "url('https://jappliedecologyblog.files.wordpress.com/2020/01/ju-jappl-2019-00454.r1.jpg?w=816')";
                        } else if (SearchTerm == "236") {
                            document.body.style.backgroundImage = "url('https://assets.nrdc.org/sites/default/files/styles/full_content--retina/public/media-uploads/01_7987416137_6f34a08933_o_2400.jpg?itok=P-MuON9V')";
                        } else if (SearchTerm == "241") {
                            document.body.style.backgroundImage = "url('https://cff2.earth.com/uploads/2017/01/03142124/Acipenser-transmontanus.jpg')";
                        } else if (SearchTerm == "242") {
                            document.body.style.backgroundImage = "url('https://ak3.picdn.net/shutterstock/videos/1036431023/thumb/10.jpg')";
                        } 
                    }
                });

            
                $.ajax({
                    url:'https://apiv3.iucnredlist.org/api/v3/species/narrative/id/'+ SearchTerm+ '?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee',
                    type: 'json',
                    method: 'post',
                    error: function (err) { 
                        console.log('NOTHING');
                    },
                    success: function (data) {
                    var taxnomic = data.result[0].taxonomicnotes;
                    var geo_range = data.result[0].geographicrange;
                    var popu = data.result[0].population;
                    var poput = data.result[0].populationtrend;
                    var habitatt = data.result[0].habitat;
                    var threat = data.result[0].threats;

                    document.getElementById("tax").innerHTML = taxnomic;
                        document.getElementById("geoo").innerHTML = geo_range;
                        document.getElementById("pop").innerHTML = popu;
                        document.getElementById("popt").innerHTML = poput;
                        document.getElementById("hbt").innerHTML = habitatt;
                        document.getElementById("thr").innerHTML = threat;

                    var dropdown = document.getElementsByClassName("dropdown-btn");
                    var a;
                    for (a = 0; a < dropdown.length; a++) {
                    dropdown[a].addEventListener("click", function() {
                    this.classList.toggle("active");
                    var dropdownContent = this.nextElementSibling;
                    if (dropdownContent.style.display === "block") {
                        dropdownContent.style.display = "none";
                    } else {
                        dropdownContent.style.display = "block";
                        }
                    });
                    }
                        
                    }

                });
            
        //});
    }
    

}