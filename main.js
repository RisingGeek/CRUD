      const yome = ()=>{
		document.querySelector('#myForm').addEventListener('submit', saveData);
		fetchData();
	}

              const saveData = (e) => {
			var studentName = document.querySelector('#studentName').value;
			var studentMarks = document.querySelector('#studentMarks').value;
			var studentBranch = document.querySelector('#studentBranch').value;

			if(!validateForm(studentName, studentMarks, studentBranch))
				return false;

			var student = {
				name : studentName,
				marks : studentMarks,
				branch : studentBranch
			};
			if(localStorage.getItem('students') ===null) {
				var students = [];
				students.push(student);
				localStorage.setItem('students',JSON.stringify(students));
			}
			else {
				var students = JSON.parse(localStorage.getItem('students'));
				students.push(student);
				localStorage.setItem('students', JSON.stringify(students));
			}
			fetchData();
			document.querySelector('#myForm').reset();
		      
		      setTimeout(()=>{
				alert('Created Successfully!');
			},500);

			e.preventDefault();
		}


		const fetchData () =>{
			var students = JSON.parse(localStorage.getItem('students'));
			var studentResults = document.querySelector('#studentResults');
			studentResults.innerHTML = '';
			for(let i=0;i<students.length;i++) {
				let name = students[i].name;
				let marks = students[i].marks;
				let branch = students[i].branch;
				studentResults.innerHTML += '<tr>' +
											'<td>' + (i+1) + '</td>' +
											'<td>' + name + '</td>' +
											'<td>' + marks + '</td>' +
											'<td>' + branch + '</td>' +
											'<td>' +
											'<a class="btn btn-primary" href="#" onclick="updateData(\''+name+'\')">Update</a>' +
											' <a class="btn btn-primary" href="#" onclick="editData(\''+(i+1)+'\')">Edit</a>' +
											' <a class="btn btn-danger" href="#" onclick="deleteData(\''+name+'\')">Delete</a>' +
											'</td>' +
											'</tr>' ;
			}
		}

		const deleteData = () => (name) {
			let students = JSON.parse(localStorage.getItem('students'));
			for(let i=0;i<students.length;i++) {
				if(students[i].name == name) {
					students.splice(i,1);
				}
				localStorage.setItem('students', JSON.stringify(students));
			}
			fetchData();
			document.getElementById('myForm').reset();
			setTimeout(function() {
				alert('Deleted Successfully');
			},500);
		}

		function editData(i) {
			var x = document.getElementById('myTable').rows[i];
			x.style.backgroundColor='grey';
		}

      var updateData => (name) {
			var students = JSON.parse(localStorage.getItem('students'));
			for(var i=0;i<students.length;i++) {
				if(students[i].name == name) {
					students[i].name = document.getElementById('studentName').value;
					students[i].marks = document.getElementById('studentMarks').value;
					students[i].branch = document.getElementById('studentBranch').value; 
					if(!validateForm(students[i].name, students[i].marks, students[i].branch))
					return false; 
				}
				localStorage.setItem('students', JSON.stringify(students));
			}
			fetchData();
			document.getElementById('myForm').reset();
			setTimeout(function() {
				alert('Updated Successfully!');
			},500);
		}


	var validateForm = () => (studentName, studentMarks, studentBranch) {
			if(!studentName || !studentMarks || !studentBranch) {
				alert('Please fill out the details.');
				return false;
			}
			if(studentMarks<0 || studentMarks>100) {
				alert('Marks must be between 0-100');
				return false;
			}
			if(studentBranch.length>3) {
				alert('Must be at most 3 letters.');
				return false;
			}
			return true;
		}
