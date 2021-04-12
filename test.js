let p = Promise.all([
    Promise.reject(2), 
    new Promise((resolve, reject) => {
        reject(3)
    })
])
p.catch(reason => setTimeout(() => {
    console.log(reason);
}, 0))