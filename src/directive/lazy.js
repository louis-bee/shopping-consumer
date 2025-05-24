const lazy = {
  bind: function (el, binding) {
    el.setAttribute('data-src', binding.value)
    el.src = require('@/assets/img/louislogo.webp')
  },
  inserted: function (el) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.src = el.getAttribute('data-src')
          observer.unobserve(el)
        }
      })
    })
    observer.observe(el)
  }
}

export default lazy
