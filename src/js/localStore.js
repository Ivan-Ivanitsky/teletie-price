
function setLocalStore(data){
    const res = localStorage.setItem('data', JSON.stringify(data))
}

export default setLocalStore