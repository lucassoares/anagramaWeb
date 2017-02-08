$(document).ready(function(){
				$("button").click(function(){
					$("#loader").show(1);
					if($("#input-word").val() == ''){
						alert("Preencha o campo para prosseguir")
						return false;
					}	
					var word = $("input").val();
					$('#anagrams').empty();
					benchMark(word);
					$("#loader").hide(1);
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
	         var cList = $('#anagrams')
	        $.each(result, function(i){
		    var li = $('<li/>')
		        .addClass('ui-menu-item item-anagrama_lista')
		        .attr('role', 'menuitem')
		        .appendTo(cList);
		    var a = $('<p/>')
		        .addClass('ui-all')
		        .text(result[i])
		        .appendTo(li);
	});
	     $("#anagrams").append("Total: " + result.length); 
	}
});