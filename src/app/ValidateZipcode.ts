'use server';

export async function ValidateZipcode(zipcode: string): Promise<boolean> {
    return /^\d{5}$/.test(zipcode) && zipcode.startsWith('79');
}