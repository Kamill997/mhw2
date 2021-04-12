for(const dish in PIATTI)
{
  const div=document.createElement("div");
  div.setAttribute("data-dish",dish);
  const section=document.querySelector(".dishes-grid");
  div.classList.add("flex-item");
  section.appendChild(div);
}

const blocchi=document.querySelectorAll('.flex-item');
for(const blocco of blocchi)
{
    const cibo=(blocco.dataset.dish);

    const title=document.createElement("h1");
    title.classList.add("titolo");
    title.textContent=PIATTI[cibo].nome;
    const img=document.createElement("img");
    img.src=PIATTI[cibo].immagine;
    blocco.appendChild(title);
    blocco.appendChild(img); 

    const dettagli=document.createElement("span");
    dettagli.textContent="Mostra descrizione";
    dettagli.classList.add("mostra");
    blocco.appendChild(dettagli);

    dettagli.addEventListener("click",descr);

    
    const descrizione=document.createElement("ol");
    descrizione.classList.add("hidden");
    descrizione.classList.add("descrizione");
    blocco.appendChild(descrizione);

    for(const cib of PIATTI[cibo].descrizione)
    {
      const desc=document.createElement("li");
      desc.textContent=cib;
      descrizione.appendChild(desc);
    }
    const bottone=document.createElement("button");
    bottone.innerHTML="Aggiungi ai preferiti";
    bottone.classList.add("preferiti");
    blocco.appendChild(bottone);
    bottone.addEventListener("click",Aggiungi);
}

function descr(event)
{
  const testo=event.currentTarget;
  
  const desc=testo.parentNode.querySelector(".descrizione");
  desc.classList.remove("hidden");
  testo.textContent="Nascondi descrizione";

  testo.removeEventListener("click",descr);
  testo.addEventListener("click",nodescr);
}


function nodescr(event)
{
  const testo=event.currentTarget;
 
  const desc=testo.parentNode.querySelector(".descrizione");
  desc.classList.add("hidden");
  testo.textContent="Mostra descrizione";

  testo.removeEventListener("click",nodescr);
  testo.addEventListener("click",descr);
}

function CercaPiatti()
{
  const cerca=document.getElementById("barra").value;
  const piatti=document.querySelectorAll("#general-elem .flex-item");

  for(let piatto of piatti)
  {
    if(piatto.querySelector("h1").textContent.toLowerCase().indexOf(cerca.toLowerCase())===-1)
    {
      piatto.classList.add("hidden");
    }
    
    else
    {
      piatto.classList.remove("hidden");
    }
  }
}

let cont=0;

function Aggiungi(event)
{
  const aggiungipref=event.currentTarget.parentNode;

  const elem=document.querySelector("#pref");
  elem.classList.remove("hidden");

  const section=document.querySelector("#pref-elem");
  section.classList.add("dishes-grid");

  const h1=document.createElement("h1");
  h1.textContent=aggiungipref.querySelector("h1").textContent;

  const img=document.createElement("img");
  img.src=aggiungipref.querySelector("img").src;
  
  
  const bottone=aggiungipref.querySelector(".preferiti");
  bottone.innerHTML="Aggiunto ai preferiti";
  bottone.removeEventListener("click",Aggiungi);

  const bottone2=document.createElement("button");
  bottone2.innerHTML="Rimuovi dai preferiti";
  bottone2.addEventListener("click",Rimuovi);

  const pref=document.createElement("div");
  pref.classList.add("flex-item");

  pref.appendChild(h1);
  pref.appendChild(img);
  pref.appendChild(bottone2);
  section.appendChild(pref);

  cont++;
}

function Rimuovi(event)
{
  const article=document.getElementById("pref");

  const pref=event.currentTarget.parentNode.querySelector("h1").textContent;

  const rim=event.currentTarget.parentNode;


  const buttons=document.querySelectorAll(".preferiti");
  for(const button of buttons)
  {
    const gen=button.parentNode.querySelector("h1").textContent;

    if(gen===pref)
    {
      button.innerHTML="Aggiungi ai preferiti";
      button.addEventListener("click",Aggiungi);
    }
    
  }
  rim.remove();
  cont--;

  if(cont===0)
  {
    article.classList.add("hidden");
  }  
}






