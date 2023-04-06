import express from 'express';
import ProductManager from './ProductManager.js';

const PORT = 8080;

const app = express();

app.use( express.urlencoded({ extended: true }));

app.listen( PORT, () => {
    console.log( `Servidor funcionando en puerto ${ PORT }`);
});

app.get( '/products', async (req, res) => {

    const productManager = new ProductManager();
    const products = await productManager.getProducts();

    const limit = req.query.limit;

    if ( limit !== NaN && limit > 0 ){

        let prodsToShow = [];

        for( let i = 1; i <= limit; i++ ) {
            prodsToShow.push( products[i] );
        }   


        return res.send({
            products: prodsToShow,
        })
    }

    res.send({
        products,
    });
});

app.get( '/products/:pid', async ( req, res ) => {

    const productManager = new ProductManager();
    const products = await productManager.getProducts();

    const pid = req.params.pid;

    const productById = products.find( prod => prod.id === Number(pid) );

    if ( productById ) {
        return res.send({
            [`product id: ${ pid }` ] : productById,
        })
    }

    return res.send({
        error: `El producto id: ${ pid } no existe.`
    })
});
