// backend/models/AffiliateLink.js
const mongoose = require('mongoose');

const affiliateLinkSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AffiliateLink = mongoose.model('AffiliateLink', affiliateLinkSchema);

module.exports = AffiliateLink;
