export class Pokemon {
    //La clase pokemon tiene originalmente en el Json del get solo name y URL, nosotros le añadiremos ID e imagen
    name: string;
    url: string;
    id: number;
    //La imagen sale, del GET que haces a /pokemon/1 (un id cualquiera)
    imageUrl: string;
    type: string = "unknown";

    //Constructor de la clase
    constructor(name: string, url: string){
        this.name = name;
        this.url = url;
        this.id = this.extracIdFromUrl(url);
        //Este enlace lo he encontrado en la api de pokemon 
        this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${this.id}.gif`;
    }
    //Metodo para partir la URL y quedarnos con el id
    private extracIdFromUrl(url: string): number{
        const urlPartida = url.split('/');
        return Number(urlPartida[urlPartida.length-2]);
    }
    
    
}
