// QuotationApi.ts

import { useState, useEffect } from 'react';

export interface Quotation {
  qutation_id: string;
  type: string;
  total_price: number;
}

export interface ApiResponse {
  message: string;
  status: boolean;
  errorMessage: string;
  code: number;
  data: {
    main_quotation: Quotation[];
    total_price:number
    gst:number
    total_price_with_gst:number
  };
 
}


