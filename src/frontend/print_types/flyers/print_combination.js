const PrintData = {
  "category":{
    "short": {
      "label": "Short Flyers",
      "size": ["s-1", "m-1"],
      "material": ["p-1"],
      "coat": ["c-1", "c-2"],
      "quantity": ["q-2", "q-3"],
      "paper_quality": ["pq-2", "pq-3"]
    },
    "medium": {
      "label": "Medium Flyers",
      "size": ["m-1", "l-1"],
      "material": ["p-1"],
      "coat": ["c-3", "c-4"],
      "quantity": ["q-1", "q-2", "q-3", "q-4"],
      "paper_quality": ["pq-1", "pq-2"]
    },
    "large": {
      "label": "Large Flyers",
      "size": ["m-1", "l-1"],
      "material": ["p-1"],
      "coat": ["c-4", "c-5"],
      "quantity": ["q-1", "q-4"],
      "paper_quality": ["pq-1", "pq-3"]
    }
  },
  "size": {
    "s-1": {
      "label": "2' x 3'",
      "material": ["p-1"]
    },
    "m-1": {
      "label": "4' x 7'"
    },
    "l-1": {
      "label": "10' x 17'"
    }
  },

  "material": {
    "p-1": {
      "label": "Paper"
    }
  },

  "paper_quality": {
    "pq-1": {
      "label": "200gsm"
    },
    "pq-2": {
      "label": "250gsm"
    },
    "pq-3": {
      "label": "300gsm"
    }
  },

  "coat": {
    "c-1": {
      "label": "Gloss"
    },
    "c-2": {
      "label": "UV coating"
    },
    "c-3": {
      "label": "Velvet"
    },
    "c-4": {
      "label": "Matt"
    },
    "c-5": {
      "label": "3D"
    }
  },

  "quantity": {
    "q-1": {
      "label": "1 - 10"
    },
    "q-2": {
      "label": "10 - 50",
    },
    "q-3": {
      "label": "50 - 500"
    },
    "q-4": {
      "label": "500 - 2000"
    }
  }
}

export default PrintData;
