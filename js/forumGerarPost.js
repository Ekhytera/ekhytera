import { authUser } from "./auth.js";
import { showMenu } from "./forum.js";
import createToast from "./toast.js";

const fotoPerfil = document.querySelector('.fotoPerfil');

let userPost;
let userId;
let userFoto;

authUser().then(dados => {
	if (dados) {
		userPost = dados.nome_usuario;
		userId = dados.id_usuario;
		userFoto = dados.endereco_imagem;
		fotoPerfil.src = dados.endereco_imagem ? `http://localhost:3000/files/${dados.endereco_imagem}` : 'imgs/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
	}
})

function addPost(settings) {
	function loadCategories() {
		let buttons = '';
		if (settings.categories && settings.categories.length > 0) {
			settings.categories.forEach(element => {
				buttons += `<button type="button" class="button secundario arredondado">${element}</button>`;
			});
		}
		return buttons;
	}

	function formatDate(dateString) {
		if (!dateString) return '2h atrás';

		const postDate = new Date(dateString);
		const now = new Date();
		const diffMs = now - postDate;
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffHours / 24);

		if (diffDays > 0) {
			return `${diffDays}d atrás`;
		} else if (diffHours > 0) {
			return `${diffHours}h atrás`;
		} else {
			return 'Agora';
		}
	}

	let post = document.createElement('div');
	post.className = 'postWrapper';

	const htmlPost = `<article class="post" id="postagem" data-id="${settings.id_usuario}" data-post="${settings.id}">
                <div class="postDetails">
                    <div class="postAuthor">
                    ${!settings.pfp || settings.pfp === '1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg' ?
			`<img class="fotoPerfil" src="imgs/${settings.pfp}"></img>` :
			`<img class="fotoPerfil" src="http://localhost:3000/files/${settings.pfp}"></img>`
		}
                        
                        <div>
                            <span class="username">${settings.username}</span>
                            <span class="subtitle">${formatDate(settings.createdAt)}</span>
                        </div>
                    </div>
                    <div class="postAside">
                        <div class="categoryButtons">
                            ${loadCategories()}                        
                        </div>
                        <div class="moreOptions">
                            <button type="button" class="iconButton" onclick="showMenu(this)"><img src="imgs/moreOptions.png"></button>
                        </div>
                    </div>
                </div>
                <div class="postBody">
					<textarea id="text" class="not-edit" readonly>${settings.text}</textarea>
                    ${settings.attachment ? `<img src="http://localhost:3000/files/${settings.attachment}">` : ''}
                </div>
                <hr>
                <div class="postFooter">
                    <div class="icon">
                        <button class="iconButton likeIcon" onclick=darLike(this)><span class="material-symbols-outlined">thumb_up</span>
                            <span class="likeCount">${settings.likes || 0}</span>
                        </button>
                    </div>
                    <div class="icon">
                        <button class="share iconButton" onclick=compartilhar(this)><span class="material-symbols-outlined">share</span>
                            <span class="shareCount">560</span>
                        </button>
                    </div>
                    <div class="icon">
                        <button class="iconButton add-comment"><span class="material-symbols-outlined">sms</span>
                            <span class="comment">123</span>
                        </button>
                    </div>
                </div>
            </article>`;

	post.innerHTML = htmlPost;
	const postsContainer = document.getElementById('postsContainer');
	postsContainer.appendChild(post);
}

// Função dar Like -------------------------------

async function darLike(el) {
	const likeCount = el.querySelector('.likeCount');
	let postId;
	document.querySelectorAll('.post').forEach(el => {
		postId = el.dataset.post;
	});
	if (userId) {
		if (!el.classList.contains('like')) {
			el.classList.add('like')
			likeCount.innerHTML = parseInt(likeCount.innerHTML) + 1;

			await fetch(`http://localhost:3000/add-like/${postId}`, {
				method: 'PATCH',
				headers: {
					'authorization': `Bearer ${localStorage.getItem('token')}`
				}
			});
		} else {
			el.classList.remove('like');
			likeCount.innerHTML = parseInt(likeCount.innerHTML) - 1;

			await fetch(`http://localhost:3000/remove-like/${postId}`, {
				method: 'PATCH',
				headers: {
					'authorization': `Bearer ${localStorage.getItem('token')}`
				}
			});
		}
	} else {
		modal.classList.remove('hide');
	}
}

document.querySelector('.writePostContainer').addEventListener('click', function () {
	if (!userId) {
		modal.classList.remove('hide');
	}
})

// Função compartilhar -------------------------------------------
async function compartilhar(el) {
	const shareCount = el.querySelector('.shareCount');

	if (navigator.share) {
		try {
			await navigator.share({
				title: 'Olhe nosso Forum',
				text: 'Confira esses comentarios!',
				url: 'https://ekhytera.github.io/newEkhytera/forum.html'
			})
			shareCount.innerHTML++

		} catch (error) {
			console.error('Erro ao compartilhar:', error)
		}
	} else {
		createToast('Erro', 'Função de compartilhar não suportada pelo navegador.', 'vermelho')
	}
}


function addCommunities() {
	let comm = document.createElement('div');
	const htmlComm = `<section class="communitiesContainer">
				<h2>Comunidades</h2>
				<div>
					<button type="button" class="iconButton"><img src="imgs/arrow_left.png"></button>
					<div class="communityCard">
						<img class="communityIcon arredondado" src="imgs/codebackimg.png">
						<h3>NVIDIA Fans</h3>
						<h4>126,309 membros</h5>
							<h5>
								<div class="statusIndicator"></div>63 online
							</h5>
							<button type="button" class="button primario">Entrar</button>
					</div>
					<div class="communityCard">
						<img class="communityIcon arredondado" src="imgs/codebackimg.png">
						<h3>AMD Fans</h3>
						<h4>126,309 membros</h5>
							<h5>
								<div class="statusIndicator"></div>63 online
							</h5>
							<button type="button" class="button primario">Entrar</button>
					</div>
					
					<div class="communityCard">
						<img class="communityIcon arredondado" src="imgs/codebackimg.png">
						<h3>Intel Fans</h3>
						<h4>126,309 membros</h5>
							<h5>
								<div class="statusIndicator"></div>63 online
							</h5>
							<button type="button" class="button primario">Entrar</button>
					</div>
					<button type="button" class="iconButton"><img src="imgs/arrow_right.png"></button>
				</div>
			</section>
`

	comm.innerHTML = htmlComm
	const commContainer = document.getElementById("communitiesContainer")

	commContainer.appendChild(comm)
}

const textArea = document.getElementById('writePostInput');

// Capturando informações do usuario logado


authUser().then(dados => {
	if (dados) {
		userPost = dados.nome_usuario;
		userId = dados.id_usuario;
	}
})

async function postar() {
	if (!userId) {
		modal.classList.remove('hide');
		return;
	}

	if (textArea.value.trim() === '') {
		createToast('Erro', 'O post não pode estar vazio', 'vermelho');
		return;
	}

	const token = localStorage.getItem('token');
	if (!token) {
		createToast('Erro', 'Usuário não autenticado', 'vermelho');
		return;
	}

	try {
		const response = await fetch('http://127.0.0.1:3000/create-post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				texto: textArea.value.trim()
			})
		});

		const result = await response.json();

		if (response.ok) {
			textArea.value = '';
			createToast("Informação", "Seu post foi enviado!", "padrao");

			console.log(result)

			addPost({
				id: result.id,
				username: result.post.nome_usuario,
				pfp: result.post.endereco_imagem || '1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg',
				text: result.post.texto,
				attachment: result.post.imagem_post || null,
				categories: ['Geral'],
				likes: 0,
				createdAt: Date.now(),
				id_usuario: result.post.id_usuario
			})
		} else {
			console.error('Error creating post:', result.message);
			createToast('Erro', 'Erro ao criar post: ' + result.message, 'vermelho');
		}
	} catch (error) {
		console.error('Network error:', error);
		createToast('Erro', 'Erro ao conectar com o servidor', 'vermelho');
	}
}

async function carregarPosts() {
	try {
		const response = await fetch('http://127.0.0.1:3000/list-posts/active');
		const data = await response.json();

		if (data.ok && data.posts) {
			data.posts.forEach(post => {
				addPost({
					id: post.id_post,
					username: post.nome_usuario,
					pfp: post.endereco_imagem || '1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg',
					text: post.texto,
					attachment: post.imagem_post || null,
					categories: ['Geral'],
					likes: post.curtidas,
					createdAt: post.criado_em,
					id_usuario: post.id_usuario
				});
			});
		} else {
			console.error('Error loading posts:', data.message);
			createToast('Erro', 'Não foi possível carregar os posts', 'vermelho');
		}
	} catch (error) {
		console.error('Error fetching posts:', error);
		createToast('Erro', 'Erro ao conectar com o servidor', 'vermelho');
	}
}

carregarPosts();

// definindo variaveis, constantes e funções globais:
window.postar = postar;
window.addCommunities = addCommunities;
window.compartilhar = compartilhar;
window.darLike = darLike;
window.showMenu = showMenu;
window.carregarPosts = carregarPosts;
