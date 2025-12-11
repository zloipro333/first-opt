import {ref, reactive} from 'vue'
import markdownit from 'markdown-it'
import router from './router'

const md = markdownit()



//[[<get-obsidian-link>]]
//content.match(/(?<=\[\[).*?(?=\]\])/g)

const shiftTabs = (string) =>
{
	let level=0
	for (; string[0] === "	"; level++)
		string = string.slice(1)
    
  return {string, level}
}

const env = {
    server: "",//"https://prfm-data.onrender.com",
    defaultWikiPage: "about"
}

let file = (name, type = "text") => fetch(`${env.server}/${name}`)
    .then(resposne => {
        return resposne[type]();
    });

class Wiki
{
    constructor()
    {
        this.menu = ref([])
        this.pages = reactive({})
        this.terms = reactive({})  

        this.currentPage = false
        this.body = ref("")
        
        file("wiki/_config.md").then(content => {
            let lines = content.split('\n')
            this.menu.value = this._buildMenu(lines) // and parce config for each
            
            if (this.currentPage) this.page = this.currentPage
        })
    }

    get title()
    {
        // console.log(this.pages)
        return  this.pages[this.currentPage] ? this.pages[this.currentPage].split("/").pop() : "Загрузка..."
    }

    set page(slug)
    {
        this.currentPage = slug || env.defaultWikiPage
        if (Object.keys(this.pages).length > 0)
        {
            let link = this.pages[slug] 
            if (link) {//link = this.pages['about']
                file(`wiki/${link}.md`).then(content => {
                    //hack over vue.ref() interpretation
                    if (typeof this.body === 'string' || this.body instanceof String) 
                        this.body = this._render(content)
                    else
                        this.body.value = this._render(content)
                })
            } else {
                this.body = ""
                router.push('/wiki/about')
            }
        }
    }

    _render(text)
    {
        let html = md.render(text).replaceAll('\n','<br>')
        
        //hack SPA links
        setTimeout(() => {
            // console.log('ky')
            document.querySelectorAll('.md-link').forEach(a => {
                a.addEventListener('click', (e) => {
                  e.preventDefault()
                  router.push({ path: a.attributes.href.value })
                })
              })
        }, 100); 

        return html.replace(/\[\[.*?\]\]/g, (value) => {
            let obsidianLink = value.slice(2,-2).split("|")
            let path = obsidianLink[0]
            let name = obsidianLink[1] || obsidianLink[0].split("/").pop()
            let slug = Object.keys(this.pages).find(slug => this.pages[slug] === path)
            return `<a aria-current="page" href="/wiki/${slug}" class="md-link router-link-active">${name}</a>`
        })  
    }

    _parseConfig(item, location = [])
    {
        let menuItem = {childs: []}
        let link = item.match(/(?<=\[\[).*?(?=\]\])/)
        if (!link)
        {
            let categoryConfig = item.split("::")
            //append title
            menuItem.title = categoryConfig[0]
            menuItem.name = categoryConfig[1].trim()
            menuItem.slug = location.concat(menuItem.name).join('-')
            menuItem.isCategory = true
        }
        else
        {
            let obsidianLink = link[0].split("|")
            let path = obsidianLink[0]
            let name = obsidianLink[1] || path.split("/").pop()
            let config = item.split("::"); config.shift();
            let slug = (config.shift() || name).trim();
            menuItem.title = name
            menuItem.name = slug
            menuItem.slug = location.concat(menuItem.name).join('-')
            //append page
            this.pages[menuItem.slug] = path
            //append terms
            config.map(term => {
                this.terms[term.trim()] = menuItem.slug
            })
        }    
        return menuItem
    }

    _buildMenu(lines)
    {
        let menu = []
            let currentSections = []
            let currentLevel = 0
            let currentPath = []
            lines.forEach(line => {       
                let item = shiftTabs(line)
                // if (currentLevel >= item.level) 
                for (let i = currentLevel; item.level <= i; i--)
                    currentPath.pop()
                // console.log(currentLevel, item.level, currentPath)
                let newItem = this._parseConfig(item.string, currentPath)

                currentLevel = item.level
                currentPath.push(newItem.name)
                currentSections[item.level] = newItem

                if (item.level > 0)
                {
                    let location = currentSections[item.level - 1]
                    location.childs.push(newItem)              
                }
                else
                {
                    menu.push(newItem)
                }
                    

            })
            return menu
    }

}



const wiki = reactive(new Wiki())

export default wiki