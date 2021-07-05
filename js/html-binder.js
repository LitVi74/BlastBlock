export class HTMLBinder {

    constructor(obj, attr, values) {
        obj._bindings = {};
    
        let els = Array.prototype.slice.call(document.querySelectorAll(`[${attr}]`));
        els.forEach(el => {
            let bind = el.getAttribute(attr);
            if (!bind) return;
            if (!obj._bindings[bind]) obj._bindings[bind] = [];
            obj._bindings[bind].push(el);
        })

        values.forEach(value => {
            let descriptor
            switch(value) {
                case 'percent':
                    descriptor = {
                        set: newValue => {
                            obj[`_${value}`] = newValue;
                            if (obj._bindings[value]) {
                                obj._bindings[value].forEach(el => {
                                    let width = el.style.width.slice(0, -1);
                                    this.animate({
                                        duration: 1000,
                                        draw: function(progress) {
                                            el.style.width = progress + '%';
                                        },
                                        startWidth: Number(width),
                                        endWidth: newValue
                                    });
                                });
                            }
                        }
                    }
                    break;
                default :
                    descriptor = {
                        set: newValue => {
                        obj[`_${value}`] = newValue;
                        if (obj._bindings[value]) {
                            obj._bindings[value].forEach(el => el.innerHTML = newValue);
                        }
                        },
                        get: () => obj[`_${value}`]
                    }
                    break;
            }
            Object.defineProperty(obj, value, descriptor)
        });

    }

    animate({duration, draw, startWidth, endWidth}){
        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start)/duration;
            if (timeFraction > 1) timeFraction = 1;

            let progress = startWidth  + timeFraction * (endWidth - startWidth);
            if (progress > 100) progress = 100;
            draw(progress);

            if (timeFraction < 1) {
            requestAnimationFrame(animate);
            }
        })
    }
  } 