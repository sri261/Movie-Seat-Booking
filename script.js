const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const text = document.querySelector('.text');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

//save selected movie index and price 
setMovieData = (movieIndex,moviePrice) =>{
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

updateSelectedCount = () => {
    
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat=>{
        return [...seats].indexOf(seat);})
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    const selectedSeatCount =  selectedSeats.length;
    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}
populateUI = () => {
    const selectedSeats =JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats != null && selectedSeats.length > 0){
    seats.forEach((seat,index)=>{
        if(selectedSeats.indexOf(index) > -1){
            seat.classList.add('selected');
        }
    });
}
}



movieSelect.addEventListener('change', e => {
    
    ticketPrice =  +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount(); 
})

container.addEventListener('click', (e) => {

    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();

    }
})