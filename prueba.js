const { expect } = require('chai');
const puppeteer = require('puppeteer');

(async()=>{
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('https://dev.clubcervecero.pe/firma');

    await page.screenshot({path: './Screenshots/pagina.png'})
    await page.click('input[data-drupal-selector="edit-submit"]')
    let feedback = await page.$$('div.invalid-feedback');

    let elems=0
    for(let i of feedback){elems++}
    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({path:'./Screenshots/form-feedback.png'})
    console.log(`Clicked "REGISTRARME AHORA" with an empty form. Feedback is shown in ${elems} elements`)


    
    const customerCodes = ['11022482', '12739524', '11155877', '10134112', '11132343', '11653926', '12884811'];
    for await(const customerCode of customerCodes) {

    await page.type('input[data-drupal-selector="edit-customer-code"]', 'customerCode');
    await page.click('button[id="onetrust-accept-btn-handler"]')
    await page.click('input[data-drupal-selector="edit-submit"]')
    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({path: './Screenshots/pagina2.png'})

    await page.click('input[list="zonas-pem-list"]')
    await page.type('input[data-drupal-selector="edit-pem-zone"]', 'PEDA01');
    //await page.click('datalist[data-drupal-selector="edit-pem-zone-values"]', 'PEDA01'); //AQUI TENGO QUE PONER LA SELECCION DEL DROPDOWN
    await page.type('input[data-drupal-selector="edit-supervisor-name"]', 'Pruebas oscar uno'); 
    await page.type('input[data-drupal-selector="edit-phone"]', '3016411667');
    await page.type('input[data-drupal-selector="edit-phone-confirm"]', '3016411667');
    await page.type('input[data-drupal-selector="edit-email"]', 'oscarpruebas@gmail.com');
    await page.type('input[data-drupal-selector="edit-email-confirm"]', 'oscarpruebas@gmail.com');
    await page.type('input[data-drupal-selector="edit-customer-address-fiscal"]', 'cr 10 # 10 - 10');
    await page.type('input[data-drupal-selector="edit-customer-agent"]', 'pruebas - 1234567890');

    await page.$eval('input[name="tyc"]', check => check.checked = true);
    await new Promise(r => setTimeout(r, 2000));
    await page.click('input[name="op"]')

    await new Promise(r => setTimeout(r, 20000));
    await page.screenshot({path:'./Screenshots/Registro-finalizado.png'})
    //const sel = 'div[class="modalRegistro--container--title"]';
    //console.log(await page.$eval(sel, el => 'Registro exitoso, revise sus mensajes de texto'));
    }
    //await page.$eval('div[class="modalRegistro--container--title"]'()).to.be.equal("Registro exitoso, revise sus mensajes de texto");
    //expect('div[class="modalRegistro--container--title"]'()).to.be.equal("Registro exitoso, revise sus mensajes de texto");






    //await page.click('button js-form-submit form-submit')
    //console.log(`Clicked "REGISTRARME AHORA". URL is now ${page.url()}`)
    //await new Promise(r => setTimeout(r, 9000));
    //await page.screenshot({path: './pagina2.png'})


    //await page.click('a.btn.btn-link')
    //console.log(`Clicked "REGISTRARME AHORA". URL is now ${page.url()}`)

   
    //await page.type('input[data-drupal-selector="edit-customer-code"]', '10169643');


    //await page.type('input[formcontrolname="lastName"]', 'Pruebas');
    //await page.type('input[formcontrolname="username"]', 'pruebas');
    //await page.type('input[formcontrolname="password"]', 'MISO4208');
    //await page.click('button.btn.btn-primary')

    //await new Promise(r => setTimeout(r, 7000));
    //await page.screenshot({path:'./success-feedback.png'})

    //feedback = await page.$("div.alert.alert-success")
    //let text = await page.evaluate(el => el.textContent, feedback)
    //console.log(`Success dialog after creating user with message: ${text}`)

    //await page.type('input[formcontrolname="username"]', 'pruebas');
    //await page.type('input[formcontrolname="password"]', 'MISO4208');
    //await page.click('button.btn.btn-primary')
    //await new Promise(r => setTimeout(r, 7000));

    feedback = await page.$('h1');

    console.log('Project loaded')
    //Interactuar con la aplicación web
    //...
    await browser.close();
    return;
})().catch(e=>console.log(e));
