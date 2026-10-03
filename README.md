# Portfolio · Mehdi Bouin

Mon site personnel : [mehdiqament.dev](https://mehdiqament.dev)

Étudiant en BUT Informatique (parcours RAPP) à Toulouse, je recherche un stage en développement (web, applications, logiciel) de 8 à 12 semaines, dès avril 2027.

## Contenu du site

- Présentation, parcours et compétences
- Projets personnels et scolaires, avec une page dédiée pour chacun
- Page stage et contact
- Site disponible en français et en anglais, thème clair et sombre

## Technologies

HTML, CSS, hébergement sur [Vercel](https://vercel.com). Le téléchargement du CV est protégé : le fichier est stocké dans un store Vercel Blob privé et servi par une fonction (`api/get-cv.ts`) après vérification d'un mot de passe et d'un reCAPTCHA.

## Structure

```
index.html, projets.html, ...   pages en français
en/                             pages en anglais
projets/                        pages détaillées des projets
api/get-cv.ts                   téléchargement protégé du CV
style.css                       styles communs
```

## Contact

Voir la page [Contact](https://mehdiqament.dev/contact.html) du site.
