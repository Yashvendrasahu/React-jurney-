
function customRender(reactElement,root){
  const domElement = document.createElement(reactElement.type)
  domElement.innerHTML = reactElement.children
  for(const prop in reactElement.props){
    if(prop=='children') continue;
    document.setAttribute(prop,reactElement.props[prop])
  }
  root.appendChild(domElement)
}
const reactElement ={
  type : 'a'
  props: {
    href: 'https://google.com',
    target: '_blank'
  },
  children : 'click to to visit google'
}
const root = document.querySelector("#root")
customRender(reactElement,root)