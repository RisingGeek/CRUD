	function yome() {
		document.getElementById('myForm').addEventListener('submit', saveData);
		fetchData();
	}

		function saveData(e) {
			var studentName = document.getElementById('studentName').value;
			var studentMarks = document.getElementById('studentMarks').value;
			var studentBranch = document.getElementById('studentBranch').value;

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
			document.getElementById('myForm').reset();
			setTimeout(function() {
				alert('Created Successfully!');
			},500);

			e.preventDefault();
		}

		function fetchData() {
			var students = JSON.parse(localStorage.getItem('students'));
			var studentResults = document.getElementById('studentResults');
			studentResults.innerHTML = '';
			for(var i=0;i<students.length;i++) {
				var name = students[i].name;
				var marks = students[i].marks;
				var branch = students[i].branch;
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

		function deleteData(name) {
			var students = JSON.parse(localStorage.getItem('students'));
			for(var i=0;i<students.length;i++) {
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

		function updateData(name) {
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

		function validateForm(studentName, studentMarks, studentBranch) {
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
