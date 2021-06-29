export class HTMLBinder {

    constructor(obj, attr, value) {
      obj._bindings = {};
  
      let els = Array.from(document.querySelectorAll(`.${attr}`));
      els.forEach(el => {
          console.log(1, value)
          if (!value) return;
          if (!obj._bindings[value]) obj._bindings[value] = [];
          obj._bindings[value].push(el);
      })
  
      
    let descriptor = {
        set: newValue => {
        obj[`_${value}`] = newValue;
        console.log(obj);
        newValue = newValue >= 100 ? 100 : newValue;
        if (obj._bindings[value]) {
            obj._bindings[value].forEach(el => el.style.cssText = "width: " + newValue + "%;");
        }
        }
    }
    Object.defineProperty(obj, value, descriptor);
    console.log(obj);
      
    }
  
  } 