import { google } from "googleapis";

export async function getPratos() {
  try {
    const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS!;

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth: auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Sheet1",
    });

    // Retorna as linhas diretamente
    return res.data.values;
  } catch (error) {
    console.error("Erro ao buscar dados da planilha:", error);
    return [];
  }
}
