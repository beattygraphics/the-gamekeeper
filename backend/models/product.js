const mongoose = require('mongoose');
const { stringify } = require('querystring');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0.0
    },
    system: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        url: String
    }],
    // images: [
    //     {
    //         public_id: {
    //             type: String,
    //             required: true
    //         },
    //         url: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ],
    system: {
        type: String,
        required: [true, 'Please select a Gaming Console'],
        enum: {
            values: [
                'Nintendo NES',
                'Super Nintendo',
                'Nintendo 64',
                'Nintendo Game Cube',
                'Nintendo Wii',
                'Nintendo GameBoy',
                'Nintendo DS',
                'Nintendo Switch',
                'Playstation 1',
                'Playstation 2',
                'Playstation 3',
                'Playstation 4',
                'Playstation PSP',
                'Original Xbox',
                'Original Xbox',
                'Xbox 360'
            ],
            message: 'Please select correct gaming Console'
        }
    },
    // seller: {
    //     type: String,
    //     required: [true, 'Please enter product seller']
    // },
    stock: {
        type: Number,
        required: [true, 'Please enter product Qty'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    // reviews: [

    //     {
    //         user: {
    //             type: mongoose.Schema.ObjectId,
    //             ref: 'User',
    //             required: true
    //         },
    //         name: {
    //             type: String,
    //             required: true
    //         },
    //         rating: {
    //             type: Number,
    //             required: true
    //         },
    //         comment: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ],
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// module.exports = mongoose.model('product', productSchema);

const Product = mongoose.model('product', productSchema);

module.exports = Product