const fs = require("fs");

module.exports = class Container {
    constructor(myFile) {
        this.myFile = myFile

        try {
            this.products = fs.readFileSync(this.myFile, 'utf-8')
            this.products = JSON.parse(this.products)
        }
        catch (error) {
            this.products = []
        }
    }

    getAll() {
        const fileContent = this.products
        return fileContent
    }

    // getById(id) {
    //     const fileContent = this.products
    //     const product = fileContent.find(product => product.id === parseInt(id))
        
    //     if (product) {
    //         return product
    //     } else {
    //         return { Error: 'Producto no encontrado!!' }
    //     }
    // }

    saveProduct(productoGuardar) {
        const fileContent = this.products
        console.log('Dentro del saveProduct: '+ JSON.stringify(productoGuardar))
        if (productoGuardar !== undefined) {
            const productToSave = JSON.stringify([...fileContent, { ...productoGuardar, id: fileContent[fileContent.length - 1].id + 1 }], null, 2)
            
            try {
                this.products = fs.writeFileSync(this.myFile, productToSave)
                
            } catch (error) {
                console.log(error)
                return { Error: 'Upps! Hubo un error y no pudimos guardar el Producto.' }
            }
        }
        else {
            return { Error: 'Upps! We had some problems saving the product, try later.' }
        }
    }

    // updateProduct(id, title, price, thumbnail) {
    //     const fileContent = this.products
    //     const productId = fileContent.find(item => item.id === Number(id))

    //     if (productId.id !== undefined && productId.id > 0 || productId !== {}) {
    //         const nonUpdatedProducts = fileContent.filter(item => item.id !== parseInt(id))
    //         const updatedProduct = { title, price, thumbnail, id: Number(id) }
            
    //         let array = [updatedProduct, ...nonUpdatedProducts]
    //         let arrayOrdered = array.sort((a,b) => { a.id - b.id })
            
    //         try {
    //             this.products = fs.writeFileSync(this.myFile, JSON.stringify(arrayOrdered))
    //             return { Success: `Producto id# ${id} actualizado con éxito de la Base de Datos!`,
    //                      Title: updatedProduct.title,
    //                      Price: updatedProduct.price,
    //                      Thumbnail: updatedProduct.thumbnail
    //             }

    //         } catch (error) {
    //             return { Error: `Error Actualizando Producto. Descripción error: ${error}` }
    //         }

    //     } else {
    //         return { Error: 'Producto no encontrado!!' }
    //     }
    // }

    // deleteById(id) {
    //     const fileContent = this.products
    //     const nonDeletedProducts = fileContent.filter(item => item.id !== parseInt(id))
    //     const productToBeDeleted = fileContent.filter(item => item.id === parseInt(id))
        
    //     let arrayOrdered = nonDeletedProducts.sort((a,b) => { a.id - b.id })
            
    //     if (id !== undefined && productToBeDeleted.length > 0) {
            
    //             try {
    //                 this.products = fs.writeFileSync(this.myFile, JSON.stringify(arrayOrdered, null, 2));
    //                 return { Success: `Producto id# ${id} eliminado con éxito de la Base de Datos!` }
    //             } catch (error) {
    //                 return { Error: `Lo sentimos, hubo un error al escribir en archivo.`}
    //             }

    //     } else {
    //         return { Error: `Lo sentimos, el Id# ${id}, NO existe en nuestra Base de Datos!` }
    //     }
    // }
}