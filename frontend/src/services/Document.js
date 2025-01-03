import api from "./api";

class DocumentService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api/documents";
  }

  async createDocument({ title }) {
    try {
      return await this.api.post(
        `${this.baseUrl}/create-document`,
        { title },
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async saveDocument(id, content) {
    try {
      return await this.api.put(
        `${this.baseUrl}/update/document/${id}`,
        { content },
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async getUserDocs() {
    try {
      return await this.api.get(`${this.baseUrl}/all-documents`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

let documentService = new DocumentService();

export default documentService;
