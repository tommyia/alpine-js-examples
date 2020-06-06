'use strict'

window.validateForm = function () {
  return {
    fullname: '',
    email: '',
    password: '',
    validation: {
      fullname: {
        rule: {
          required: function (field) {
            if (field) {
              return { error: false, message: ''}
            } else {
              return { error: true, message: 'This field is required.'}
            }
          },
          minLength: function (field, value = 2) {
            if (field && field.length >= value) {
              return { error: false, message: ''}
            } else {
              return { error: true, message: `This field must have minimum ${value} characters length.`}
            }
          }
        },
        error: true,
        message: ''
      },
      email: {
        rule: {
          required: function (field) {
            if (field) {
              return { error: false, message: ''}
            } else {
              return { error: true, message: 'This field is required.'}
            }
          },
          email: function (field) {
            const rgx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (rgx.test(field)) {
              return { error: false, message: ''}
            } else {
              return { error: true, message: 'This field has wrong email address format.'}
            }
          }
        },
        error: true,
        message: ''
      },
      password: {
        rule: {
          required: function (field) {
            if (field) {
              return { error: false, message: ''}
            } else {
              return { error: true, message: 'This field is required.'}
            }
          },
          minLength: function (field, value = 8) {
            if (field && field.length >= value) {
              return { error: false, message: ''}
            } else {
              return { error: true, message: `This field must have minimum ${value} characters length.`}
            }
          }
        },
        error: true,
        message: ''
      }
    },
    validate (field) {
      for (const key in this.validation[field].rule) {
        const validationResult = this.validation[field].rule[key](this[field])
        if (validationResult.error) {
          this.validation[field].error = true
          this.validation[field].message = validationResult.message
          break
        }
        this.validation[field].error = false
        this.validation[field].message = ''
        continue
      }
    }
  }
}

window.alertComponent = function () {
  return {
    openAlertBox: false,
    alertBackgroundColor: '',
    alertMessage: '',
    showAlert(type) {
      this.openAlertBox = true
      switch (type) {
        case 'success':
          this.alertBackgroundColor = 'bg-green-500'
          this.alertMessage = `${this.successIcon} ${this.defaultSuccessMessage}`
          break
        case 'info':
          this.alertBackgroundColor = 'bg-blue-500'
          this.alertMessage = `${this.infoIcon} ${this.defaultInfoMessage}`
          break
        case 'warning':
          this.alertBackgroundColor = 'bg-yellow-500'
          this.alertMessage = `${this.warningIcon} ${this.defaultWarningMessage}`
          break
        case 'danger':
          this.alertBackgroundColor = 'bg-red-500'
          this.alertMessage = `${this.dangerIcon} ${this.defaultDangerMessage}`
          break
      }
      this.openAlertBox = true
    },
    successIcon: `<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 mr-2 text-white"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
    infoIcon: `<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 mr-2 text-white"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
    warningIcon: `<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 mr-2 text-white"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
    dangerIcon: `<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 mr-2 text-white"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>`,
    defaultInfoMessage: `This alert contains info message.`,
    defaultSuccessMessage: `This alert contains success message.`,
    defaultWarningMessage: `This alert contains warning message.`,
    defaultDangerMessage: `This alert contains danger message.`,
  }
}

window.dataTable = function () {
  return {
    items: [],
    view: 5,
    searchInput: '',
    pages: [],
    offset: 5,
    pagination: {
      total: data.length,
      lastPage: Math.ceil(data.length / 5),
      perPage: 5,
      currentPage: 1,
      from: 1,
      to: 1 * 5
    },
    currentPage: 1,
    sorted: {
      field: 'name',
      rule: 'asc'
    },
    initData() {
      this.items = data.sort(this.compareOnKey('name', 'asc'))
      this.showPages()
    },
    compareOnKey(key, rule) {
      return function(a, b) { 
        if (key === 'name' || key === 'job' || key === 'email' || key === 'country') {
          let comparison = 0
          const fieldA = a[key].toUpperCase()
          const fieldB = b[key].toUpperCase()
          if (rule === 'asc') {
            if (fieldA > fieldB) {
              comparison = 1;
            } else if (fieldA < fieldB) {
              comparison = -1;
            }
          } else {
            if (fieldA < fieldB) {
              comparison = 1;
            } else if (fieldA > fieldB) {
              comparison = -1;
            }
          }
          return comparison
        } else {
          if (rule === 'asc') {
            return a.year - b.year
          } else {
            return b.year - a.year
          }
        }
      }
    },
    checkView(index) {
      return index > this.pagination.to || index < this.pagination.from ? false : true
    },
    checkPage(item) {
      if (item <= this.currentPage + 5) {
        return true
      }
      return false
    },
    search(value) {
      if (value.length > 1) {
        const options = {
          shouldSort: true,
          keys: ['name', 'job'],
          threshold: 0
        }                
        const fuse = new Fuse(data, options)
        this.items = fuse.search(value).map(elem => elem.item)
      } else {
        this.items = data
      }
      // console.log(this.items.length)
      
      this.changePage(1)
      this.showPages()
    },
    sort(field, rule) {
      this.items = this.items.sort(this.compareOnKey(field, rule))
      this.sorted.field = field
      this.sorted.rule = rule
    },
    changePage(page) {
      if (page >= 1 && page <= this.pagination.lastPage) {
        this.currentPage = page
        const total = this.items.length
        const lastPage = Math.ceil(total / this.view) || 1
        const from = (page - 1) * this.view + 1
        let to = page * this.view
        if (page === lastPage) {
          to = total
        }
        this.pagination.total = total
        this.pagination.lastPage = lastPage
        this.pagination.perPage = this.view
        this.pagination.currentPage = page
        this.pagination.from = from
        this.pagination.to = to
        this.showPages()
      }
    },
    showPages() {
      const pages = []
      let from = this.pagination.currentPage - Math.ceil(this.offset / 2)
      if (from < 1) {
        from = 1
      }
      let to = from + this.offset - 1
      if (to > this.pagination.lastPage) {
        to = this.pagination.lastPage
      }
      while (from <= to) {
        pages.push(from)
        from++
      }
      this.pages = pages
    },
    changeView() {
      this.changePage(1)
      this.showPages()
    },
    isEmpty() {
      return this.pagination.total ? false : true
    }
  }
}