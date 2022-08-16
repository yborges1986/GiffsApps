import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _history: string[] = [];
  private apiKey: string = 'aFO7903dSexnIDMr7KE3T2fK493UpRsF'
  private serviceUrl = "https://api.giphy.com/v1/gifs";


  public results: Gif[] = [];

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || []
    //get last search results
    this.results = JSON.parse(sessionStorage.getItem('lastSearch')!) || []

  }

  public get history(): string[] {
    return [...this._history];
  }

  searchGifs(query: string) {
    query = query.trim().toLocaleLowerCase()
    if (!this._history.includes(query)) {
      this._history.unshift(query)
    }
    this._history = this._history.splice(0, 10)
    localStorage.setItem('history', JSON.stringify(this._history))

    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("q", query)
      .set("limit", "10")

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((response) => {
        this.results = response.data
        sessionStorage.setItem('lastSearch', JSON.stringify(response.data))
      })


  }



}