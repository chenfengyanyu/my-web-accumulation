function resolveAfter2Seconds() {
	return new Promise(resolve => {
        setTimeout(() => {
            resolve('dddd')
        },2000)
    })
}

async function test() {
    let res = await resolveAfter2Seconds();
    console.log(res);
}

test();