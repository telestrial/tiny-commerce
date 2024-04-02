import { useEffect, useState } from 'react';
import { sql } from '@vercel/postgres';

import seedDB from '../lib/seedDB';

export default async function ProductFeed() {
  let data;

  try {
    data = await sql`SELECT * FROM products;`;
  } catch (e: any) {
    if (e.message.includes('relation "products" does not exist')) {
      console.log(
        'Table does not exist, creating and seeding it with dummy data now...'
      );
      // Table is not created yet
      await seedDB();
      data = await sql`SELECT * FROM products;`;
    } else {
      throw e;
    }
  }

  const { rows: products } = data;

  return (
    <div>
      {products.map((product) => {
        console.log(product);
        return <div key={product.id}>{product.name}</div>;
      })}
    </div>
  );
}