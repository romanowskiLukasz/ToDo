
$('#reloadStorage').click(function()
{
	localStorage.clear();
    location.reload();
	
})


window.onload=date();

function date(){
	var date=new Date();
	var day=date.getDate();
	var month=date.getMonth()+1;
	if(day<10) day='0'+day;
	if(month<10) month='0'+month;
	$("#myDayHeader").append("Today's date: "+day+"."+month);  
}
const DONE='icon-ok myDayCheckIcon';
let LIST, id;
// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}
// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo("",item.name, item.id, item.done, item.trash,item.important); 
    });
	
}
function uptadeTasksNum()
{
	
	$("#importantTaskCount").text($('ul#importantList li').length);
	if($('ul#importantList li').length==0) {$("#importantTaskCount").text("");}
	
	$("#TaskCount").text($('ul#taskList li').length);
	if($('ul#taskList li').length==0) {$("#TaskCount").text("");}
	
	$("#completedTaskCount").text($('ul#complitedList li').length);
	if($('ul#complitedList li').length==0) {$("#completedTaskCount").text("");}
	 
}
function addToDo(category,toDo, id, done, trash,important)
{
	if(trash){ return; }
    
	if(category==="" && done==false) category="#taskList";
	if(category==="#taskList")
	{
		$(category).append(`<li class="item">
						<p class="task">${toDo}</p>
						<i class='icon-star-filled ${id}' job="important" id="${id}"></i> 
						<i class='icon-ok ${id}' job="complete" id="${id}" ></i> 
						<i class='icon-trash ${id}' job="delete" id="${id}"></i> 
					</li> 
					`);
		if(important==true) $("#"+id).css("color", "#8A2BE2");
	}
	if(category==="" && done==true) category="#complitedList";
	if(category==="#complitedList")
	{
		$(category).append(`<li class="item">
						<p class="task">${toDo}</p>  
						<i class='icon-trash ${id}' job="delete" id="${id}"></i> 
						
					</li> 
					`);
	}
	if(  important==true && done==false) 
	{
	category="#importantList";
	}
	if(category==="#importantList")
	{
		$(category).append(`<li class="item">
						<p class="task">${toDo}</p>  
						<i class='icon-ok ${id}' job="complete"  id="${id}"></i>
						<i class='icon-trash ${id}' job="delete" id="${id}"></i> 
						
					</li> 
					`);
	}
	
	uptadeTasksNum()
	
}

$("#TaskInput").on("keyup",function(e)
{
	if(e.keyCode == 13 && $("#TaskInput").val() != "")
	{ 
		const toDo = $("#TaskInput").val();
		addToDo("#taskList",toDo, id, false, false);
		$("#TaskInput").val("");
		LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false,
				important:false
            });
		localStorage.setItem("TODO", JSON.stringify(LIST));
		id++;
	}
	
});

function removeToDo(element){
	$("."+element.id).parent().fadeOut( function() {
		$("."+element.id).parent().remove();
		$('.importantList ').find("."+element.id).remove();
		uptadeTasksNum()
	});
	
    
    LIST[element.id].trash = true;
	
}

function completeToDo(element){
	var text=element.parentNode.querySelector(".task"); 
	 
		$("."+element.id).parent().remove();
		$('.importantList ').find("."+element.id).remove();
		uptadeTasksNum()
	 
    LIST[element.id].done = true;
	addToDo("#complitedList",$(text).text(), element.id, true, false,false);
}

function addToImportant(element){
	var text=element.parentNode.querySelector(".task"); 
	addToDo("#importantList",$(text).text(), element.id, false, false,true);
	
    
    LIST[element.id].important = true;
	uptadeTasksNum()
}

$("#taskList").click(function(){
	const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
	else if(elementJob == "important" && LIST[element.id].important == false){
        addToImportant(element);
		$(element).css("color", "#8A2BE2");
    }
	localStorage.setItem("TODO", JSON.stringify(LIST));
});
$("#complitedList").click(function(){
	const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
      if(elementJob == "delete"){
        removeToDo(element);
    }
	localStorage.setItem("TODO", JSON.stringify(LIST));
});

$("#importantList").click(function(){
	const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
	localStorage.setItem("TODO", JSON.stringify(LIST));
});



	 
$('#myDayButton').click(function()
{
	$('#CompletedContent').hide();
	$('#TasksContent').hide();
	$('#ImportantContent').hide();
	$('#myDayContent').show();
})

$('#completedButton').click(function()
{
	$('#myDayContent').hide();
	$('#TasksContent').hide();
	$('#ImportantContent').hide();
	$('#CompletedContent').show();
})

$('#TasksButton').click(function()
{
	$('#myDayContent').hide();
	$('#CompletedContent').hide();
	$('#ImportantContent').hide();
	$('#TasksContent').show();
})

$('#importantButton').click(function()
{
	$('#myDayContent').hide();
	$('#CompletedContent').hide();
	$('#TasksContent').hide();
	$('#ImportantContent').show();
	
})
 