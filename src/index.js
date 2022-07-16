module.exports = function check(str, bracketsConfig) {
  let pair = {}
  let open = []
  let exception = []
  let stack = []
  
  bracketsConfig.forEach(el => el.forEach((elel, i) => {
    if(i === 0){
      open.push(elel)
    } else {
      pair[elel] = el[0]
      if(elel === el[0]) exception.push(elel)
    }
  }))
  
  for(let i = 0; i < str.length; i++){
    let bracket = str[i]
    let isOpen = open.includes(bracket)
    if(!isOpen && stack.length === 0){
      return false
    } else if(isOpen && exception.includes(bracket) && stack.length > 0) {
      if(stack[stack.length - 1] === bracket){
        stack.pop()
      } else {
        stack.push(bracket)
      }
    } else if(isOpen) {
      stack.push(bracket)
    }
    
    if(!isOpen) {
      if(pair[bracket] === stack[stack.length - 1]){
        stack.pop()
      } else {
        return false
      }
    }
  }
  
  return stack.length === 0
}
