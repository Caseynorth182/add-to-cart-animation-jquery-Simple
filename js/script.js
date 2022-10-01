$(document).ready(function () {
    /* --------------------------- //NOTE glabal vars --------------------------- */
    let count_cart_tag = $('.counter');
    let count_cart = localStorage.getItem('count') !== null ? localStorage.getItem('count') : 0;
    let cart_color = localStorage.getItem('color') !== null ? localStorage.getItem('color') : 'fff';
    //просто так 
    count_cart_tag.html(count_cart)
    $('.shopping-cart svg').css({
        'fill': '#' + cart_color
    })

    //NOTE ADD TO CART ANIM
    $('.add-to-cart').on('click', function () {
        var cart = $('.shopping-cart');
        var imgtodrag = $(this).parent('.item').find("img").eq(0);
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                    top: imgtodrag.offset().top,
                    left: imgtodrag.offset().left
                })
                .css({
                    'opacity': '0.8',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '100'
                })
                .appendTo($('body'))
                .animate({
                    'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
                }, 1000, 'easeInOutExpo');

            setTimeout(function () {
                cart.effect("shake", {
                    times: 2
                }, 200);
                //inc count
                count_cart++;
                //set to local storadge
                localStorage.setItem('count', count_cart)
                count_cart_tag.html(count_cart)
                //change cart color for fun
                localStorage.setItem('color', (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase())
                let cart_color = localStorage.getItem('color')
                $('.shopping-cart svg').css({
                    'fill': '#' + cart_color
                })
            }, 1500);
            //delete cloned img
            imgclone.animate({
                'width': 0,
                'height': 0
            }, function () {
                $(this).detach()
            });
        }
    });
}) 