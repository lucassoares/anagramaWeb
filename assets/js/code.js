$(document).ready(function(){
				$("button").click(function(){
					if($('#input-word').val().length >= 9){
						$('.alerta-caracteres').show();
						$('.alerta-vazio').hide();
						$('#anagrams').empty();
						return false;
					}
					if($("#input-word").val() == ''){
						$('.alerta-vazio').show();
						$('.alerta-caracteres').hide();
						$('#anagrams').empty();
						return false;
					}
					$('.alerta-caracteres').hide();
					$('.alerta-vazio').hide();
					var word = $("#input-word").val().toLowerCase();
					$('#anagrams').empty();
					$("#loader").show();	
					window.setTimeout(function(){
        				benchMark(word)
    					}, 0);
				});
				
	function generateAnagrams(word){
	    if (word.length < 2){
	        return [word];
	    }else{
	        var anagrams = [];
	        var before, focus, after;
	        var shortWord, subAnagrams, newEntry;
	        var i = 0;

	        for (var i = 0; i < word.length; i++){
	            before = word.slice(0, i);
	            focus = word[i];
	            after = word.slice(i + 1, word.length + 1);
	            shortWord = before + after;
	            subAnagrams = generateAnagrams(shortWord);
	            for (var j = 0; j < subAnagrams.length; j++){

	                newEntry = focus + subAnagrams[j];
	                anagrams.push(newEntry);
	            }
	        }
	         anagrams.sort();
	        var newAnagrams = anagrams.filter(function(index, i){
	        	return anagrams.indexOf(index) == i;
	        });
			return newAnagrams;
	    }
	}

	function benchMark(word){
	    var result = generateAnagrams(word);
	    for (var i=result.length-1; i>=0; i--){
    		if (result[i].charAt(0) == '0'){
        	result.splice(i, 1);
    		}
		}
	         var cList = $('#anagrams')
	        $.each(result, function(i){
		    var li = $('<li/>')
		        .addClass('ui-menu-item item-anagrama_lista')
		        .attr('role', 'menuitem')
		        .appendTo(cList);
		    var a = $('<p/>')
		        .addClass('ui-all')
		        .text((i+1) +' - ' + result[i])
		        .appendTo(li);
	});
	     $("#anagrams").append("Total: " + result.length);
	     $('#loader').hide();	 
	}
});