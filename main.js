

//    ******    Guess Word Game    ********




function renderGame(){
    
    // General
    
    
    function setTitles(){
    
        const gameName = "Guess The Word"
        document.title = gameName;
        document.querySelector("footer").innerHTML = gameName
        document.querySelector("h1").append(document.createTextNode(gameName))
        
    
    }
    
    setTitles()
    
    
    
    
    const numbersOfTries = 6;
    const numbersOfLetters = 6;
    let currentTri = 1;
    
    // Manage Hints
    
    
    
    // Manage Words
    
    
    
    
        let wordToGuess = ""
      const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
       wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase()
    
    
    
    // Generate Inputs 
    
    
    function createInputs(){
    
        const inputCont = document.querySelector(".inputs")
    
        for(let i = 1 ; i<=numbersOfTries;i++){
    
            const div = document.createElement("div")
            div.classList.add(`try-${i}`)
            div.innerHTML = `<span>Try-${i}</span>`
    
            i !== 1 && div.classList.add("disabled-inputs");
            
            for(let j = 1 ; j<= numbersOfLetters;j++){
                const input = document.createElement("input")
                input.type = "text"
                input.maxLength = "1"
                input.id = `guess-${i}-letters-${j}`
                div.append(input)
            }
            
            inputCont.append(div)
        }
    
    
        initializeInputs(inputCont)
    
    }
    
    
    
    
    
    function initializeInputs(inputCont){
        
        
        inputCont.children[0].children[1].focus()
        const disabledInputs = document.querySelectorAll(".disabled-inputs input")
        const allInputs = document.querySelectorAll(".inputs input")
    
        disabledInputs.forEach((input)=>{input.disabled = true})
        
        allInputs.forEach((input,index)=>{
        
            input.addEventListener("input",()=>{
                input.value = input.value.toUpperCase()
                let nextB = allInputs[index + 1]
                if(nextB) nextB.focus()
            })
        
        
        handleNavigationKeyDown(allInputs,input)
    
        })
    
        
    }
    
    
    
    
    
    
    
    function handleNavigationKeyDown(allInputs,input){
    
        input.addEventListener("keydown",function(e){
    
            let currentIndex = Array.from(allInputs).indexOf(e.target)
            if(e.key === "ArrowRight") {
                if(currentIndex <= allInputs.length){allInputs[currentIndex+1].focus();} 
            }
    
            else if( e.key === "ArrowLeft"){
               if(currentIndex >= 0){allInputs[currentIndex - 1].focus();} 
            }
    
            else if(e.key === "Backspace"){
                if(currentIndex >= 0){ allInputs[currentIndex].value = "";
                allInputs[currentIndex - 1].focus();
            }
    
            e.preventDefault();
    
            }
        
        })
    }
    
    
    
    
    
    
    
    window.onload = function(){
        createInputs()
      
    }
    
    
    
    
    
    
    // Handle Guesses
    
    const checkB = document.querySelector(".check")
    checkB.addEventListener("click",handleGuessess)
    
    console.log(wordToGuess)
    
    function handleGuessess(){
    
        const message = document.querySelector(".message")
        let successGuess = true
    
        for(let i = 1 ; i <= numbersOfLetters; i++){
    
        let inputField = document.querySelector(`#guess-${currentTri}-letters-${i}`)
        let letter = inputField ? inputField.value.toLowerCase() : '';
        let rightLetter = wordToGuess[i - 1]
     
        if(letter === rightLetter){
        inputField.classList.add("yes-in-place")
      }
      else if(wordToGuess.includes(letter) && letter !== ""){
        inputField.classList.add("not-in-place");
        successGuess = false;
      }
      else {
        inputField.classList.add("no");
        successGuess = false;
      }
    
    }
    
    
    
    
        checkSuccessGuess(successGuess,message)
     
    
    
    
    
        currentTri++
        
    
    
        checkNumberTries(successGuess,message)
      
    
    
            }
          
        
            
        
    
    
    
            function checkSuccessGuess(successGuess,message){
    
                if(successGuess){
                    message.innerHTML = `Congrats : Winner   The Word Is <span>${wordToGuess}</span>`
                    checkB.disabled = true
                    hintsButton.disabled = true
                
                }
                else{
                    document.querySelector(`.try-${currentTri}`).classList.add("disabled-inputs")
                    let currentTriInputs = document.querySelectorAll(`.try-${currentTri} input`)
    
                    currentTriInputs.forEach((tri)=>{
                        tri.disabled = true
                    })
                }
             }
    
    
             function  checkNumberTries(successGuess,message){
                if(currentTri <= numbersOfTries  && !successGuess){
                    
                    document.querySelector(`.try-${currentTri}`).classList.remove("disabled-inputs")
                    let currentTriInputs = document.querySelectorAll(`.try-${currentTri} input`)
                    currentTriInputs.forEach((tri)=>{
                        tri.disabled = false
                    })
            
                    document.querySelector(`.try-${currentTri}`).children[1].focus();
                }
                else if(currentTri > numbersOfTries ){
                    checkB.disabled = true
                    hintsButton.disabled = true
                    message.innerHTML = `Game Overs The Word Is <span>${wordToGuess}</span>`;
            
                }
               }
            
    
    
    
    
    //// Manage Hints 
    
    
    let numbersOfHints = 2;
    const hintsButton = document.querySelector(".hint")
    const hintSpan = document.querySelector(".hint span")
    hintSpan.innerHTML = numbersOfHints
    hintsButton.addEventListener("click",manageHint)
    
    
    function manageHint(){
    
        if(numbersOfHints > 0){
            numbersOfHints--
            hintSpan.innerHTML = numbersOfHints
    
        }
         if(numbersOfHints === 0){
            hintsButton.disabled = true
    
        };
    
        
        addHint()
     
    }   
    
    
    function addHint(){
        const enabledInputs = document.querySelectorAll("input:not(:disabled)")
        const empyInputs =    Array.from(enabledInputs).filter((input)=> input.value === "")
    
        if(empyInputs.length > 0){
            const randomInput = empyInputs[Math.floor(Math.random() * empyInputs.length)]
            const indexOfRandomInput = Array.from(enabledInputs).indexOf(randomInput)
            randomInput.value = wordToGuess[indexOfRandomInput].toUpperCase()
        }
        
    }
    
    
    
    
    
    
    
    
    function handleButtonKeyDown(){
    
        document.body.addEventListener("keydown",(e)=>{
    
            if(e.key === "Enter"){
                checkB.click()
            }
            else if(e.key === "\\"){
                window.location.reload()
            }
        })
    
    }
    
    handleButtonKeyDown()
    
    
    }
    
    
    renderGame()
    






