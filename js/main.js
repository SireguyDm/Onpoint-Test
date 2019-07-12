$(document).ready(function () {

    //Костыль от костыля
    $('html, body').animate({
        scrollTop: 0
    });
   
    //Получаем высоту секций
    var block_heigh = parseInt($('.slider-block').css('height'));
    //Получаем кол-во секций
    var pages_count = 0;
    $('.slider-block').each(function(){
        pages_count++;
    });
    
    //Touch events
    var startPosition;
    var finalPosition;
    document.addEventListener('touchstart', function(event) {
        //Начально касания
        startPosition=event.changedTouches[0];
    }, false);
    document.addEventListener('touchend', function(event) {
        //Конец касания
        finalPosition=event.changedTouches[0];
        var Y_displacement = startPosition.pageY - finalPosition.pageY;
        //Получаем координату нажатия
        var currect_position = startPosition['pageY'];
        
        //Если листаем вниз, то
        if (Y_displacement > 10){
            //Получаем целую часть от деления координаты нажатия и высоты блока
            let a = Math.floor(currect_position / block_heigh);
            //Если секция не последняя
            if ( (a+1) < pages_count ){
                //Переключаем активную секцию на правой панели
                $('.switch-btn').removeClass('active');
                $('[data-number='+ (a+1) +']').addClass('active');
                
                //Сдвигаем слайдер к след. секции
                $('html, body').animate({
                    scrollTop: (block_heigh * (a+1))
                }, 700);
                //Анимация движения объектов снизу вверх
                $('.proba').each(function(e){
                    let item_height = parseInt($(this).css('top'));
                    $(this).animate({
                        top: item_height - 200 + 'px'
                    }, 850);
                });
                //Скрываем нижнюю панель
                if ( (a+1) == (pages_count - 1) ){
                    $('.bottom-panel').animate({
                        opacity: 0
                    }, 300);
                }
            };
        //Если листаем вверх, то         
        } else if (Y_displacement < -10){ 
            //Получаем целую часть от деления координаты нажатия и высоты блока
            let a = Math.floor( currect_position / block_heigh );
            //Если секция не первая
            if ( (a-1) >= 0 ){
                //Переключаем активную секцию на правой панели
                $('.switch-btn').removeClass('active');
                $('[data-number='+ (a-1) +']').addClass('active');
                
                //Сдвигаем слайдер к след. секции
                $('html, body').animate({
                    scrollTop: (block_heigh * (a-1))
                }, 700);
                //Анимация движения объектов сверху вниз
                $('.proba').each(function(e){
                    let item_height = parseInt($(this).css('top'));
                    $(this).animate({
                        top: item_height + 200 + 'px'
                    }, 850);
                });
                //Показываем нижнюю панель
                if ( a == (pages_count - 1) ){
                    $('.bottom-panel').animate({
                        opacity: 1
                    }, 300);
                }
            };
        }
    }, false);     
});
