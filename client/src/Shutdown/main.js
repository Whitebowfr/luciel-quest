import React from "react"
import "./shutdown.css"
import { URL } from "../utils"

const techGibberishA = `struct group_info init_groups = { .usage = ATOMIC_INIT(2) };
struct group_info *groups_alloc(int gidsetsize){
	struct group_info *group_info;
	int nblocks;
	int i;

	nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK;
	/* Make sure we always allocate at least one indirect block pointer */
	nblocks = nblocks ? : 1;
	group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER);
	if (!group_info)
		return NULL;
	group_info->ngroups = gidsetsize;
	group_info->nblocks = nblocks;
	atomic_set(&group_info->usage, 1);

	if (gidsetsize <= NGROUPS_SMALL)
		group_info->blocks[0] = group_info->small_block;
	else {
		for (i = 0; i < nblocks; i++) {
			gid_t *b;
			b = (void *)__get_free_page(GFP_USER);
			if (!b)
				goto out_undo_partial_alloc;
			group_info->blocks[i] = b;
		}
	}
	return group_info;

out_undo_partial_alloc:
	while (--i >= 0) {
		free_page((unsigned long)group_info->blocks[i]);
	}
	kfree(group_info);
	return NULL;
}

EXPORT_SYMBOL(groups_alloc);

void groups_free(struct group_info *group_info)
{
	if (group_info->blocks[0] != group_info->small_block) {
		int i;
		for (i = 0; i < group_info->nblocks; i++)
			free_page((unsigned long)group_info->blocks[i]);
	}
	kfree(group_info);
}

EXPORT_SYMBOL(groups_free);

static int groups_to_user(gid_t __user *grouplist,
			  const struct group_info *group_info)
{
	int i;
	unsigned int count = group_info->ngroups;

	for (i = 0; i < group_info->nblocks; i++) {
		unsigned int cp_count = min(NGROUPS_PER_BLOCK, count);
		unsigned int len = cp_count * sizeof(*grouplist);

		if (copy_to_user(grouplist, group_info->blocks[i], len))
			return -EFAULT;

		grouplist += NGROUPS_PER_BLOCK;
		count -= cp_count;
	}
	return 0;
}

static void groups_sort(struct group_info *group_info)
{
	int base, max, stride;
	int gidsetsize = group_info->ngroups;

	for (stride = 1; stride < gidsetsize; stride = 3 * stride + 1)
		; /* nothing */
	stride /= 3;

	while (stride) {
		max = gidsetsize - stride;
		for (base = 0; base < max; base++) {
			int left = base;
			int right = left + stride;
			gid_t tmp = GROUP_AT(group_info, right);

			while (left >= 0 && GROUP_AT(group_info, left) > tmp) {
				GROUP_AT(group_info, right) =
				    GROUP_AT(group_info, left);
				right = left;
				left -= stride;
			}
			GROUP_AT(group_info, right) = tmp;
		}
		stride /= 3;
	}
}`

const techGibberishB = `int groups_search(const struct group_info *group_info, gid_t grp)
{
	unsigned int left, right;

	if (!group_info)
		return 0;

	left = 0;
	right = group_info->ngroups;
	while (left < right) {
		unsigned int mid = left + (right - left)/2;
		if (grp > GROUP_AT(group_info, mid))
			left = mid + 1;
		else if (grp < GROUP_AT(group_info, mid))
			right = mid;
		else
			return 1;
	}
	return 0;
}

int set_groups(struct cred *new, struct group_info *group_info)
{
	put_group_info(new->group_info);
	groups_sort(group_info);
	get_group_info(group_info);
	new->group_info = group_info;
	return 0;
}

EXPORT_SYMBOL(set_groups);

int set_current_groups(struct group_info *group_info)
{
	struct cred *new;
	int ret;

	new = prepare_creds();
	if (!new)
		return -ENOMEM;

	ret = set_groups(new, group_info);
	if (ret < 0) {
		abort_creds(new);
		return ret;
	}

	return commit_creds(new);
}

EXPORT_SYMBOL(set_current_groups);

SYSCALL_DEFINE2(getgroups, int, gidsetsize, gid_t __user *, grouplist)
{
	const struct cred *cred = current_cred();
	int i;

	if (gidsetsize < 0)
		return -EINVAL;

	/* no need to grab task_lock here; it cannot change */
	i = cred->group_info->ngroups;
	if (gidsetsize) {
		if (i > gidsetsize) {
			i = -EINVAL;
			goto out;
		}
		if (groups_to_user(grouplist, cred->group_info)) {
			i = -EFAULT;
			goto out;
		}
	}
out:
	return i;
}

SYSCALL_DEFINE2(setgroups, int, gidsetsize, gid_t __user *, grouplist)
{
	struct group_info *group_info;
	int retval;

	if (!nsown_capable(CAP_SETGID))
		return -EPERM;
	if ((unsigned)gidsetsize > NGROUPS_MAX)
		return -EINVAL;

	group_info = groups_alloc(gidsetsize);
	if (!group_info)
		return -ENOMEM;
	retval = groups_from_user(group_info, grouplist);
	if (retval) {
		put_group_info(group_info);
		return retval;
	}

	retval = set_current_groups(group_info);
	put_group_info(group_info);

	return retval;
}`

export default function ShutdownScreen() {

    return <div>
            <div className="screen">
                <div id="randomStuff">{techGibberishA}</div>
                <div className="info centered">
                    <img src={URL + "/anim.gif"} alt=""/>
                    <h1 className="centered">CONNECTION LOST</h1>
                </div>
                <div id="randomStuffB">{techGibberishB}</div>
            </div>
            <div className="fadeIn" />
            <div className="credits centered">
                <h1>Merci d'avoir joué !</h1>
                <h2>Crédits</h2>
                <ul>
                    <li>Robin, le génie qui a tout lancé en Mars (mais évidemment on fait toujours tout au dernier moment)</li>
                    <li>Clémentin (c'est moi qu'ai fait tout le site, j'ai sacrifié 50h de ma vie à ça)</li>
                    <li>Enzo, qui a organisé tous les évènements</li>
                    <li>Ezéchiel, qui a alpha-test le site quand il était encore bourré de bugs et qu'il manquait la moitié du jeu</li>
                    <li>Samuel, le premier vrai beta-tester qu'on a réveillé juste pour lui demander de venir tester (et qui par son manque de connaissances a trouvé la masse de bugs)</li>
                    <li>Le coturne de Robin, qui a trouvé un bug critique pendant les 24h</li>
                    <li>quinten, un random sur github qui m'a donné l'idée du dernier mini-jeu et m'a aidé à créer les niveaux</li>
                    <li>Phiodide, pour m'avoir donné la motivation de continuer et des tonnes d'idées</li>
                </ul>
            </div>
        </div>
}